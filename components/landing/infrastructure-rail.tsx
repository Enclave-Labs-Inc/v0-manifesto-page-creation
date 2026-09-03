import Image from 'next/image'

const infrastructure = [
  { name: 'aws', label: 'AWS', src: '/brand/aws.svg', wide: true },
  { name: 's3', label: 'S3', src: '/brand/s3.svg', wide: false },
  { name: 'kms', label: 'KMS', src: '/brand/kms.svg', wide: false },
  { name: 'postgresql', label: 'PostgreSQL', src: '/brand/postgresql.svg', wide: false },
  { name: 'cloudtrail', label: 'CloudTrail', src: '/brand/cloudtrail.svg', wide: false },
]

export default function InfrastructureRail() {
  return (
    <section className="relative w-full overflow-hidden bg-[oklch(0.965_0_0)] text-[#050608]">
      {/* Ghosted mountain — color thread with hero + how-it-works + problem */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Cool wash echoing the hero's mountain-shadow direction */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.86_0.02_240/0.28)_0%,transparent_55%)]"
      />
      {/* Cream veil so the ghost stays as tone, not imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.82)_0%,oklch(0.965_0_0/0.9)_100%)]"
      />
      {/* Top + bottom hairlines to seat the rail between the sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.88_0_0)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[oklch(0.88_0_0)]" />

      <div className="relative z-[1] mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:items-center lg:gap-10">
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">
              BUILT AROUND THE SYSTEMS
            </p>
            <p className="font-display text-[clamp(1.15rem,1.9vw,1.5rem)] font-medium tracking-[-0.03em] text-[#050608]">
              your security team already trusts
            </p>
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-[#E0E3E8] border-y border-[#E0E3E8] sm:grid-cols-5 sm:divide-y-0 sm:border-x-0">
            {infrastructure.map((item) => (
              <div
                key={item.name}
                className="flex h-[76px] items-center justify-center gap-2.5 px-3 text-[12.5px] font-medium text-[#050608]"
              >
                <img
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  className={`grayscale ${item.wide ? 'h-6 w-auto' : 'h-5 w-5'}`}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
