const capabilities = [
  {
    label: '01',
    title: 'Connects what you already have',
    body: 'Slack, Drive, GitHub, Confluence, Jira, and the rest. Natural-language questions with sourced answers.',
  },
  {
    label: '02',
    title: 'Runs where you already trust',
    body: 'Deployed inside your AWS account. Your storage, your keys, your Postgres, your audit surface.',
  },
  {
    label: '03',
    title: 'Refuses to guess',
    body: 'When evidence is thin, Enclave says so. Traceability is a feature, not a failure mode.',
  },
]

export default function CapabilitiesSection() {
  return (
    <section className="border-b border-[#1A1C20]">
      <div className="max-w-7xl mx-auto px-6 py-[clamp(4rem,8vw,6rem)]">
        <p className="text-manifesto-label mb-12">what you get</p>

        <div className="space-y-0 divide-y divide-[#1A1C20]">
          {capabilities.map((item) => (
            <article
              key={item.label}
              className="grid md:grid-cols-[5rem_1fr_1.2fr] gap-6 md:gap-10 py-10 first:pt-0 last:pb-0"
            >
              <p className="text-[11px] font-mono text-[#5E636F] pt-1">{item.label}</p>
              <h2 className="text-[18px] font-mono text-[#E8E9EC] leading-snug">{item.title}</h2>
              <p className="text-manifesto-body md:pt-0.5">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
