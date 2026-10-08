'use client'

import { useReveal } from './use-reveal'

const items = [
  {
    title: 'Every fact has a source.',
    body: 'The document, the line and the extractor behind each relationship.',
  },
  {
    title: 'Nothing is overwritten.',
    body: 'Ask what was true on any date. Old facts keep their history.',
  },
  {
    title: 'Every query is on the record.',
    body: 'An EU AI Act Article 12 audit record, in a tamper-evident chain.',
  },
]

export default function Guarantees() {
  const list = useReveal<HTMLUListElement>(0.2)

  return (
    <section className="bg-[#0B0C0F] text-[#F4F5F7]">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(6rem,12vw,10rem)] sm:px-10 lg:px-14">
        <ul ref={list.ref} data-in-view={list.inView} className="grid gap-14 md:grid-cols-3 md:gap-12">
          {items.map((item, i) => (
            <li key={item.title} className="stagger-pop" style={{ ['--stagger-delay' as string]: `${i * 100}ms` }}>
              <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[34ch] text-[16px] leading-[1.65] text-[#9EA3AD]">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
