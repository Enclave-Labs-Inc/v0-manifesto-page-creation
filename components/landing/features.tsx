const features = [
  {
    label: '01',
    title: 'Data stays under your governance',
    body: 'Enclave is deployed into infrastructure you control: customer-owned storage, customer-owned keys, customer-owned logs.',
  },
  {
    label: '02',
    title: 'Answers arrive with evidence',
    body: 'Employees ask natural-language questions across company knowledge and get responses tied back to Slack threads, docs, tickets, and code.',
  },
  {
    label: '03',
    title: 'Shadow AI gets an approved path',
    body: 'Security can say yes without accepting the usual SaaS exposure. Legal gets sources. Employees get a useful Company Brain.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="border-t border-[oklch(0.9_0.006_145)] bg-[oklch(0.975_0.004_145)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div>
          <p className="mb-5 text-[13px] font-bold text-[#6C727C]">The architectural claim</p>
          <h2 className="max-w-[10ch] text-[clamp(2.25rem,5vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#111214]">
            Privacy is the deployment boundary.
          </h2>
        </div>

        <div className="divide-y divide-[oklch(0.88_0.008_145)] border-y border-[oklch(0.88_0.008_145)]">
        {features.map((feature) => (
          <article key={feature.title} className="grid gap-5 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8">
            <p className="text-[13px] font-bold text-[#8A9099]">{feature.label}</p>
            <div>
              <h3 className="mb-3 text-[22px] font-bold tracking-[-0.035em] text-[#111214]">
                {feature.title}
              </h3>
              <p className="max-w-[58ch] text-[15px] leading-[1.75] text-[#5F6368]">{feature.body}</p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  )
}
