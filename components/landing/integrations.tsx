const integrations = [
  { name: 'AWS', note: 'deployment' },
  { name: 'S3', note: 'storage' },
  { name: 'KMS', note: 'keys' },
  { name: 'Postgres', note: 'state' },
  { name: 'Slack', note: 'messages' },
  { name: 'GitHub', note: 'code' },
  { name: 'Drive', note: 'docs' },
  { name: 'Jira', note: 'tickets' },
  { name: 'Confluence', note: 'wiki' },
  { name: 'Bedrock', note: 'models' },
]

export default function IntegrationsSection() {
  return (
    <section className="border-t border-[oklch(0.9_0.006_145)] bg-[oklch(0.994_0.002_145)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="mb-12 text-center text-[16px] tracking-[-0.02em] text-[#303236]">
          Built around the systems your security team already trusts
        </p>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-5 lg:grid-cols-10">
          {integrations.map((item) => (
            <div key={item.name} className="group flex min-h-20 flex-col items-center justify-start gap-3 text-center">
              <span className="text-[clamp(1.45rem,2.2vw,2.2rem)] font-bold leading-none tracking-[-0.055em] text-[#2B2D31] opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                {item.name}
              </span>
              <span className="rounded-full border border-[oklch(0.9_0.006_145)] bg-[oklch(0.99_0.003_145)] px-2.5 py-1 text-[11px] font-bold text-[#8A9099]">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
