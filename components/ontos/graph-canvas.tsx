'use client'

import { useEffect, useState } from 'react'
import { ENTITY, type EntityType } from './entity'

type Node = { id: string; label: string; type: EntityType; x: number; y: number; hub?: boolean }
type Edge = { from: string; to: string; label: string }

// Entities from a synthetic set of SEC filings.
const nodes: Node[] = [
  { id: 'mbg', label: 'Meridian Bank Group', type: 'Company', x: 300, y: 230, hub: true },
  { id: 'hih', label: 'Halcyon Insurance', type: 'Company', x: 520, y: 110 },
  { id: 'blackpine', label: 'Blackpine LLP', type: 'Company', x: 470, y: 300 },
  { id: 'xu', label: 'Diane Xu', type: 'Person', x: 120, y: 110 },
  { id: 'krishnan', label: 'Priya Krishnan', type: 'Person', x: 90, y: 300 },
  { id: 'blake', label: 'Terrence Blake', type: 'Person', x: 260, y: 60 },
  { id: 'pd', label: 'Wholesale-Credit-PD-v3', type: 'Model', x: 330, y: 420 },
  { id: 'audit', label: 'Audit Committee', type: 'Committee', x: 120, y: 430 },
  { id: 'fed', label: 'Federal Reserve', type: 'Regulator', x: 580, y: 370 },
  { id: '8k', label: '8-K · 2025 Q1', type: 'Filing', x: 590, y: 220 },
]

const edges: Edge[] = [
  { from: 'xu', to: 'mbg', label: 'CFO_OF' },
  { from: 'krishnan', to: 'mbg', label: 'CFO_OF' },
  { from: 'blake', to: 'mbg', label: 'CRO_OF' },
  { from: 'blackpine', to: 'mbg', label: 'AUDITS' },
  { from: 'blackpine', to: 'hih', label: 'AUDITS' },
  { from: 'mbg', to: 'pd', label: 'OPERATES' },
  { from: 'krishnan', to: 'audit', label: 'MEMBER_OF' },
  { from: 'audit', to: 'mbg', label: 'COMMITTEE_OF' },
  { from: 'fed', to: 'mbg', label: 'SUPERVISES' },
  { from: 'fed', to: 'pd', label: 'GOVERNS' },
  { from: '8k', to: 'mbg', label: 'FILED_BY' },
]

// Traversals the canvas cycles through, as edge indexes.
const paths = [
  [5, 9], // MBG → model ← Fed
  [3, 4], // Blackpine audits both issuers
  [1, 6, 7], // Krishnan → Audit Committee → MBG
  [10, 0, 1], // 8-K → MBG ← both CFOs
]

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const ease = 'cubic-bezier(0.23, 1, 0.32, 1)'

export default function GraphCanvas() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setActive((a) => (a + 1) % paths.length), 2800)
    return () => window.clearInterval(t)
  }, [])

  const lit = new Set(paths[active])
  const litNodes = new Set(paths[active].flatMap((i) => [edges[i].from, edges[i].to]))

  return (
    <svg
      viewBox="0 0 700 500"
      className="h-full w-full"
      role="img"
      aria-label="A knowledge graph of a bank, its officers, auditor, regulator and models, with one relationship path highlighted at a time"
    >
      {edges.map((e, i) => {
        const a = byId[e.from]
        const b = byId[e.to]
        const on = lit.has(i)
        return (
          <g key={i} className="ontos-edge" style={{ animationDelay: `${300 + i * 70}ms` }}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={on ? '#050608' : '#C9CCD3'}
              strokeWidth={on ? 1.5 : 1}
              strokeDasharray={on ? '4 4' : undefined}
              className={on ? 'ontos-flow' : undefined}
              style={{ transition: `stroke 500ms ${ease}` }}
            />
            <text
              x={(a.x + b.x) / 2}
              y={(a.y + b.y) / 2 - 7}
              textAnchor="middle"
              className="font-mono"
              fontSize="9"
              letterSpacing="0.08em"
              fill={on ? '#050608' : 'transparent'}
              paintOrder="stroke"
              stroke={on ? '#FAFAF8' : 'transparent'}
              strokeWidth={4}
              style={{ transition: `fill 500ms ${ease}` }}
            >
              {e.label}
            </text>
          </g>
        )
      })}

      {nodes.map((n, i) => {
        const on = litNodes.has(n.id)
        const r = n.hub ? 8 : 6
        const c = ENTITY[n.type]
        return (
          <g key={n.id} className="ontos-node" style={{ animationDelay: `${i * 60}ms` }}>
            <circle
              cx={n.x}
              cy={n.y}
              r={r + 8}
              fill={c}
              opacity={on ? 0.2 : 0}
              style={{ transition: `opacity 500ms ${ease}` }}
            />
            <circle cx={n.x} cy={n.y} r={r} fill={c} stroke="#FAFAF8" strokeWidth={2} />
            <text x={n.x + r + 7} y={n.y + 3} fontSize="11.5" fontWeight={on ? 600 : 400} fill={on ? '#050608' : '#50545B'}>
              {n.label}
            </text>
            <text x={n.x + r + 7} y={n.y + 15} fontSize="8" letterSpacing="0.14em" className="font-mono" fill="#9499A6">
              {n.type.toUpperCase()}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
