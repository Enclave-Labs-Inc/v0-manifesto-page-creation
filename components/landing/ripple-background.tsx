'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

// useLayoutEffect paints synchronously after DOM mutation but before browser
// paint   the canvas mesh appears on the first frame instead of a frame
// after. Falls back to useEffect during SSR to silence React's warning.
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

// Grid resolution. Cols span left↔right; rows span near↔far (depth).
// High density so the perspective-spread foreground stays tightly packed.
const COLS = 460
const ROWS = 200

// World geometry (units are arbitrary stage-space; the camera sits in the
// same space and projects to canvas).
const WORLD_WIDTH = 4200
const WORLD_DEPTH = 5800
const NEAR_OFFSET = 320 // closest grid row sits this far in front of camera

// Camera. Slightly above and forward of the grid origin, tilted down a touch.
const CAMERA = { x: 0, y: -380, z: 0 }
const FOCAL = 1450
const HORIZON_Y = STAGE_HEIGHT * 0.32

// Grazing light from upper-left   surfaces facing the light read bright.
const LIGHT = normalize(-0.65, -0.78, -0.32)

interface Particle {
  x: number
  y: number
  size: number
  alpha: number
  // Density scoring   brighter cores at peaks/ridges.
  intensity: number
  // Pre-computed halo radius so we don't recompute per draw call.
  haloRadius: number
  // 0 = sharp, 1 = fully out-of-focus bokeh.
  blur: number
}

interface Bokeh {
  x: number
  y: number
  radius: number
  alpha: number
  pulseRate: number
  pulsePhase: number
}

interface Dust {
  x: number
  y: number
  radius: number
  alpha: number
  driftRate: number
  bobRate: number
  bobPhase: number
}

function normalize(x: number, y: number, z: number) {
  const len = Math.sqrt(x * x + y * y + z * z)
  return { x: x / len, y: y / len, z: z / len }
}

// Deterministic hash → [0, 1)
function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function smooth(t: number) {
  return t * t * (3 - 2 * t)
}

// Value noise with smooth interpolation. Returns [0, 1].
function valueNoise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = smooth(xf)
  const v = smooth(yf)
  const a = hash2(xi, yi)
  const b = hash2(xi + 1, yi)
  const c = hash2(xi, yi + 1)
  const d = hash2(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

// Fractal sum: large mountains + medium ridges + small ripples.
// Returns roughly [0, 1] (close to it).
function fbm(x: number, y: number) {
  let sum = 0
  let amp = 1
  let freq = 1
  let max = 0
  for (let i = 0; i < 5; i += 1) {
    sum += amp * valueNoise(x * freq, y * freq)
    max += amp
    amp *= 0.52
    freq *= 2.07
  }
  return sum / max
}

// Ridged noise (1 - |centered noise|) emphasizes ridges over rolling hills.
function ridged(x: number, y: number) {
  const n = valueNoise(x, y) * 2 - 1
  const r = 1 - Math.abs(n)
  return r * r
}

// Composite elevation: a U-shaped base (valley in the middle, peaks on the
// left and right) with multi-octave noise layered on top so the terrain has
// uneven dunes/bumps everywhere instead of a clean curve.
function elevation(u: number, v: number, time: number) {
  // u in [-0.5, 0.5] left/right of center
  // v in [0, 1] near → far
  const drift = time * 0.045

  // Base U-shape. Squared so the edges rise smoothly from the center valley.
  // Higher multiplier → steeper uphill, deeper valley.
  const baseShape = Math.pow(u, 2) * 6.4

  // Extra concentrated dip behind the centered headline so the valley reads
  // as a deep pocket rather than a gentle bowl.
  const centerDip =
    Math.exp(-Math.pow(u / 0.16, 2)) *
    Math.exp(-Math.pow((v - 0.3) / 0.32, 2)) *
    1.4

  // Uneven bumps: large-amplitude low-frequency dunes scattered across the
  // whole surface. These break the symmetry of the U-shape.
  const dunes = (fbm(u * 2.4 + 1.7 + drift * 0.4, v * 2.6 + 0.3) - 0.5) * 1.4

  // Sharp ridges scattered through the terrain   gives the topology
  // mountain-range character rather than smooth dunes alone.
  const ridges =
    ridged(u * 4.2 - 0.6 + drift * 0.3, v * 4.6 + 0.9) * 0.55

  // Smaller secondary bumps   adds the "uneven" detail the user asked for,
  // varying across the whole field rather than concentrated.
  const secondaryBumps =
    (fbm(u * 5.8 + 3.1, v * 5.4 - drift * 0.5) - 0.5) * 0.55

  // High-frequency surface tension   strongest in the foreground (large v)
  // so distant terrain reads smoother (atmospheric compression).
  const microRipple =
    valueNoise(u * 10.5 + drift, v * 10.5 - drift * 0.8) * 0.22 * Math.pow(v, 1.5)

  // Localized "broken topology" in the left-bottom quadrant   a soft
  // gaussian mask concentrates extra bumps + sharp ridges there so that
  // corner reads as more chaotic / mountainous than the rest.
  const leftBottomMask =
    Math.exp(-Math.pow((u + 0.28) / 0.22, 2)) *
    Math.exp(-Math.pow((v - 0.78) / 0.22, 2))
  const leftBottomBumps =
    (fbm(u * 7.4 + 11.3, v * 8.1 - 4.7 + drift * 0.6) - 0.5) * 1.7 * leftBottomMask
  const leftBottomRidges =
    ridged(u * 9.6 + 5.2, v * 9.0 - 2.1 - drift * 0.4) * 0.95 * leftBottomMask
  const leftBottomMicro =
    (valueNoise(u * 18 + 7.7, v * 18 - 3.3) - 0.5) * 0.55 * leftBottomMask

  // Mirror in the right-bottom quadrant with its own noise seed so the
  // hills don't look symmetric.
  const rightBottomMask =
    Math.exp(-Math.pow((u - 0.28) / 0.22, 2)) *
    Math.exp(-Math.pow((v - 0.78) / 0.22, 2))
  const rightBottomBumps =
    (fbm(u * 7.1 + 23.7, v * 8.4 + 9.1 + drift * 0.5) - 0.5) * 1.6 * rightBottomMask
  const rightBottomRidges =
    ridged(u * 9.2 + 17.4, v * 9.4 + 12.6 - drift * 0.3) * 0.9 * rightBottomMask
  const rightBottomMicro =
    (valueNoise(u * 17.5 + 19.2, v * 17.5 + 6.1) - 0.5) * 0.5 * rightBottomMask

  // Hills: positive elevation pumps in both corners so the terrain visibly
  // rises into "hills" (vs the negative dunes/bumps which only displace).
  // ridged() returns [0, 1]   we add it directly so the contribution is
  // always lifting, then scale by the corner mask.
  const leftHill = ridged(u * 4.2 + 3.1, v * 4.6 + 0.7) * 1.35 * leftBottomMask
  const rightHill = ridged(u * 4.4 + 14.7, v * 4.8 + 8.3) * 1.3 * rightBottomMask

  // Smaller scattered hills inside the central valley. Heights are
  // intentionally uneven   a low-frequency amplitude field modulates each
  // hill's height so some are nearly flat and some lift noticeably, instead
  // of a uniform sea of bumps.
  const valleyMask =
    Math.exp(-Math.pow(u / 0.2, 2)) *
    Math.exp(-Math.pow((v - 0.4) / 0.28, 2))
  // 0..1 amplitude field varying slowly across the valley. Squaring pushes
  // most of the area toward "flat" while leaving occasional taller pockets.
  const heightField = Math.pow(fbm(u * 3.4 + 71.3, v * 3.8 + 53.4), 1.6)
  // Mix of ridged (sharp peaks) + fbm (rolling)   multiplied by heightField
  // so amplitude varies dramatically by location.
  const valleyHill =
    ridged(u * 9.4 + 31.7, v * 10.2 + 27.3) * 1.15 * valleyMask * heightField
  const valleyBumps =
    (fbm(u * 7.6 + 41.2, v * 7.9 + 33.1) - 0.4) *
    1.35 *
    valleyMask *
    (0.2 + heightField * 1.4)

  return (
    baseShape -
    centerDip +
    dunes +
    ridges +
    secondaryBumps +
    microRipple +
    leftBottomBumps +
    leftBottomRidges +
    leftBottomMicro +
    rightBottomBumps +
    rightBottomRidges +
    rightBottomMicro +
    leftHill +
    rightHill +
    valleyHill +
    valleyBumps
  )
}

// Project a world-space point (x, y, z) to canvas pixels.
function project(worldX: number, worldY: number, worldZ: number) {
  const dx = worldX - CAMERA.x
  const dy = worldY - CAMERA.y
  const dz = worldZ - CAMERA.z
  if (dz <= 1) return null
  const px = STAGE_WIDTH * 0.5 + (dx / dz) * FOCAL
  const py = HORIZON_Y + (dy / dz) * FOCAL
  const scale = FOCAL / dz
  return { x: px, y: py, scale, depth: dz }
}

export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useIsoLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let scaleX = 1
    let scaleY = 1
    // Animation paused   mesh renders once on mount and on resize.
    const STATIC_TIME = 0

    const seededRandom = (seed: number) => {
      let value = seed >>> 0
      return () => {
        value = (value * 1664525 + 1013904223) >>> 0
        return value / 4294967296
      }
    }

    // Just a couple of broad, very soft glows on the upper-left to suggest
    // a light source raking across the fabric. The mesh dots themselves do
    // most of the visual work.
    const bokeh: Bokeh[] = (() => {
      const rand = seededRandom(1623)
      const seeds: Array<[number, number, number, number]> = [
        [180, 560, 520, 0.26],
        [80, 760, 600, 0.18],
        [420, 640, 380, 0.12],
      ]
      return seeds.map(([x, y, radius, alpha]) => ({
        x,
        y,
        radius,
        alpha,
        pulseRate: 0.12 + rand() * 0.15,
        pulsePhase: rand() * Math.PI * 2,
      }))
    })()

    const dust: Dust[] = (() => {
      const rand = seededRandom(7741)
      return Array.from({ length: 130 }, () => ({
        x: rand() * STAGE_WIDTH * 0.55,
        y: 360 + rand() * 540,
        radius: 1.4 + rand() * 4.8,
        alpha: 0.06 + rand() * 0.18,
        driftRate: 3 + rand() * 9,
        bobRate: 0.3 + rand() * 0.7,
        bobPhase: rand() * Math.PI * 2,
      }))
    })()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, window.innerWidth)
      const height = Math.max(1, window.innerHeight)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      scaleX = canvas.width / STAGE_WIDTH
      scaleY = canvas.height / STAGE_HEIGHT
    }

    const drawBackdrop = () => {
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      ctx.save()
      ctx.scale(scaleX, scaleY)

      // Top studio wash   bright cream falling to neutral.
      const topWash = ctx.createRadialGradient(
        STAGE_WIDTH * 0.5,
        STAGE_HEIGHT * 0.02,
        0,
        STAGE_WIDTH * 0.5,
        STAGE_HEIGHT * 0.02,
        STAGE_WIDTH * 0.72
      )
      topWash.addColorStop(0, 'rgba(255,255,255,0.96)')
      topWash.addColorStop(0.36, 'rgba(246,247,249,0.58)')
      topWash.addColorStop(1, 'rgba(212,216,222,0)')
      ctx.fillStyle = topWash
      ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT)

      // Volumetric atmospheric fog mid-frame so distant terrain reads
      // softer than foreground (depth cueing).
      const fogWash = ctx.createLinearGradient(0, STAGE_HEIGHT * 0.28, 0, STAGE_HEIGHT * 0.72)
      fogWash.addColorStop(0, 'rgba(232,234,238,0.32)')
      fogWash.addColorStop(0.5, 'rgba(200,206,214,0.22)')
      fogWash.addColorStop(1, 'rgba(140,146,156,0.12)')
      ctx.fillStyle = fogWash
      ctx.fillRect(0, STAGE_HEIGHT * 0.28, STAGE_WIDTH, STAGE_HEIGHT * 0.44)

      // Bottom anchor   kept tight (last ~15%) so mesh dots stay visible
      // through the lower corners.
      const bottomAnchor = ctx.createLinearGradient(0, STAGE_HEIGHT * 0.85, 0, STAGE_HEIGHT)
      bottomAnchor.addColorStop(0, 'rgba(40,44,50,0)')
      bottomAnchor.addColorStop(0.6, 'rgba(22,26,32,0.4)')
      bottomAnchor.addColorStop(1, 'rgba(6,8,12,0.9)')
      ctx.fillStyle = bottomAnchor
      ctx.fillRect(0, STAGE_HEIGHT * 0.85, STAGE_WIDTH, STAGE_HEIGHT * 0.15)

      ctx.restore()
    }

    const drawBokeh = (time: number) => {
      ctx.save()
      ctx.scale(scaleX, scaleY)
      ctx.globalCompositeOperation = 'screen'
      ctx.filter = 'blur(28px)'

      for (const orb of bokeh) {
        const pulse = 1 + Math.sin(time * orb.pulseRate + orb.pulsePhase) * 0.04
        const radius = orb.radius * pulse
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius)
        gradient.addColorStop(0, `rgba(255,255,255,${orb.alpha})`)
        gradient.addColorStop(0.5, `rgba(255,255,255,${orb.alpha * 0.3})`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.fillRect(orb.x - radius, orb.y - radius, radius * 2, radius * 2)
      }

      ctx.filter = 'none'
      ctx.restore()
    }

    // The terrain: build a 3D particle grid each frame (cheap for 170×72),
    // shade by light direction + depth fog, and render back-to-front so
    // foreground glow lands on top of distant haze.
    const drawTerrain = (time: number) => {
      ctx.save()
      ctx.scale(scaleX, scaleY)
      ctx.globalCompositeOperation = 'screen'

      const peakHeight = 380 // world-units of vertical displacement

      // Pre-sample elevations into a flat array so we can compute slope/normal
      // via finite differences without re-evaluating fbm 3× per point.
      const elev = new Float32Array(COLS * ROWS)
      for (let r = 0; r < ROWS; r += 1) {
        const v = r / (ROWS - 1)
        for (let c = 0; c < COLS; c += 1) {
          const u = c / (COLS - 1) - 0.5
          elev[r * COLS + c] = elevation(u, v, time) * peakHeight
        }
      }

      const particles: Particle[] = []

      for (let r = 0; r < ROWS; r += 1) {
        const v = r / (ROWS - 1)
        // Depth-aware row spacing: rows near the horizon are compressed.
        const z = NEAR_OFFSET + Math.pow(v, 1.25) * WORLD_DEPTH

        for (let c = 0; c < COLS; c += 1) {
          const u = c / (COLS - 1) - 0.5
          const worldX = u * WORLD_WIDTH
          const h = elev[r * COLS + c]

          // Surface normal via finite differences on the elevation field.
          const c1 = Math.max(0, c - 1)
          const c2 = Math.min(COLS - 1, c + 1)
          const r1 = Math.max(0, r - 1)
          const r2 = Math.min(ROWS - 1, r + 1)
          const dHdU = (elev[r * COLS + c2] - elev[r * COLS + c1]) /
            ((c2 - c1) / (COLS - 1))
          const dHdV = (elev[r2 * COLS + c] - elev[r1 * COLS + c]) /
            ((r2 - r1) / (ROWS - 1))

          // Normal of a height field: (-dH/dx, 1, -dH/dz), normalized.
          // Scale gradients into world units so the normal isn't degenerate.
          const nx = -dHdU / WORLD_WIDTH
          const ny = 1
          const nz = -dHdV / WORLD_DEPTH
          const nl = Math.sqrt(nx * nx + ny * ny + nz * nz)
          const NX = nx / nl
          const NY = ny / nl
          const NZ = nz / nl

          // Lambert with grazing light: the L vector is flipped because our
          // y axis points down; we want surfaces tilted toward upper-left to
          // brighten.
          const lambert = Math.max(
            0,
            -(LIGHT.x * NX + LIGHT.y * NY + LIGHT.z * NZ)
          )

          // World position: HORIZON_Y baseline minus elevation (up = darker
          // numerically because canvas y grows downward, so we subtract).
          const worldY = -h * 0.9

          const projected = project(worldX, worldY, z)
          if (!projected) continue
          if (projected.x < -200 || projected.x > STAGE_WIDTH + 200) continue
          if (projected.y < -100 || projected.y > STAGE_HEIGHT + 100) continue

          // Depth fog: 0 (close) → 1 (far).
          const depthT = Math.min(1, (projected.depth - NEAR_OFFSET) / WORLD_DEPTH)
          const fog = Math.pow(1 - depthT, 1.15)

          // Tiny pinpoint dots. They grow only slightly toward the
          // foreground   density and overlap (via screen blending) carry the
          // glow.
          const size = 0.45 + projected.scale * 1.2

          // Peak boost: high elevation reads brighter, valleys diffuse.
          const normalizedH = Math.min(1, Math.max(0, (h + peakHeight * 0.2) / peakHeight))
          const peakBoost = 0.42 + normalizedH * 0.8
          const slopeBoost = 0.4 + lambert * 1.0

          // Sparkle: occasional brighter vertices for specular character.
          const sparkleSeed = hash2(c * 17 + 7, r * 31 + 3)
          const sparkle = sparkleSeed > 0.985 ? 2.0 : sparkleSeed > 0.94 ? 1.3 : 1

          // Vertical anchor   only fades the very last sliver above the rail
          // so the bottom-left/right corners still carry mesh dots.
          const screenV = (projected.y - HORIZON_Y) / (STAGE_HEIGHT - HORIZON_Y)
          const railFade = 1 - Math.pow(Math.max(0, screenV - 0.86) / 0.14, 1.6) * 0.85

          // Horizontal bias: slight left preference for the light pool, but
          // the right side stays close in brightness so both lower corners
          // carry mesh density evenly.
          const screenU = projected.x / STAGE_WIDTH
          const leftWeight =
            0.85 + Math.exp(-Math.pow((screenU - 0.22) / 0.5, 2)) * 0.25

          // Central headline fade   dots in the middle band stay sharp but
          // dim, so the valley reads as a softer pocket without going blurry.
          const centerFade =
            1 -
            Math.exp(-Math.pow((screenU - 0.5) / 0.24, 2)) *
              Math.exp(-Math.pow((screenV - 0.2) / 0.36, 2)) *
              0.7

          // Depth-of-field: only the bottom-left and bottom-right corners go
          // out of focus. The valley stays in focus (just faded).
          const leftBottomBlur =
            Math.exp(-Math.pow(screenU / 0.32, 2)) *
            Math.exp(-Math.pow(Math.max(0, 1 - screenV) / 0.4, 2))
          const rightBottomBlur =
            Math.exp(-Math.pow((1 - screenU) / 0.32, 2)) *
            Math.exp(-Math.pow(Math.max(0, 1 - screenV) / 0.4, 2))
          const blur = Math.min(1, Math.max(leftBottomBlur, rightBottomBlur))

          const alpha = Math.min(
            0.96,
            0.62 * fog * peakBoost * slopeBoost * sparkle * railFade * leftWeight * centerFade
          )
          if (alpha < 0.03) continue

          particles.push({
            x: projected.x,
            y: projected.y,
            size,
            alpha,
            intensity: lambert * normalizedH,
            // Out-of-focus dots get a much larger soft halo to read as bokeh.
            haloRadius: size * (2.5 + blur * 9.0),
            blur,
          })
        }
      }

      // Back-to-front sort so closer dots draw on top.
      particles.sort((a, b) => a.y - b.y)

      // Out-of-focus pass: soft radial discs for particles in the bottom
      // corners (depth-of-field bokeh).
      for (const p of particles) {
        if (p.blur < 0.18) continue
        const haloAlpha = Math.min(0.55, p.alpha * (0.4 + p.blur * 0.6))
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.haloRadius)
        halo.addColorStop(0, `rgba(255,255,255,${haloAlpha})`)
        halo.addColorStop(0.45, `rgba(255,255,255,${haloAlpha * 0.28})`)
        halo.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = halo
        ctx.fillRect(
          p.x - p.haloRadius,
          p.y - p.haloRadius,
          p.haloRadius * 2,
          p.haloRadius * 2
        )
      }

      // In-focus pass: crisp pinpoints. Blurred dots drop their sharp core
      // entirely (the bokeh halo above carries them), so the corners read as
      // soft light rather than dot-on-glow.
      for (const p of particles) {
        if (p.blur > 0.55) continue
        const coreAlpha = p.alpha * (1 - p.blur * 0.7)
        if (coreAlpha < 0.02) continue
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${coreAlpha})`
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
      }

      ctx.restore()
    }

    const drawDust = (time: number) => {
      ctx.save()
      ctx.scale(scaleX, scaleY)
      ctx.globalCompositeOperation = 'screen'

      for (const speck of dust) {
        const driftedX = (speck.x + time * speck.driftRate) % (STAGE_WIDTH * 0.6)
        const bob = Math.sin(time * speck.bobRate + speck.bobPhase) * 18
        const y = speck.y + bob
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${speck.alpha})`
        ctx.arc(driftedX, y, speck.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const draw = () => {
      drawBackdrop()
      drawBokeh(STATIC_TIME)
      drawTerrain(STATIC_TIME)
      drawDust(STATIC_TIME)
    }

    const handleResize = () => {
      resize()
      draw()
    }

    resize()
    draw()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.985_0.002_145)_0%,oklch(0.94_0.003_145)_28%,oklch(0.82_0.004_145)_54%,oklch(0.36_0.004_145)_82%,oklch(0.08_0.003_145)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(ellipse_at_center_top,oklch(1_0_0/0.7)_0%,oklch(0.99_0.002_145/0.32)_45%,transparent_82%)]" />
      <canvas
        ref={canvasRef}
        className="landing-mesh-reveal absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-x-0 bottom-0 h-[16vh] bg-[linear-gradient(to_bottom,transparent,oklch(0.06_0.003_145/0.9)_82%)]" />
    </div>
  )
}
