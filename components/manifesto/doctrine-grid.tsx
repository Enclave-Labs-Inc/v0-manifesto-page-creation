const doctrines = [
  {
    num: '01',
    title: 'Sovereignty',
    subtitle: 'Your data never leaves',
    body: 'Not in transit, not in processing, not ever. Data sovereignty is not a feature. It is the product. Every architectural decision is made in service of this.',
  },
  {
    num: '02',
    title: 'Retrieval',
    subtitle: 'Retrieval quality is the product',
    body: 'The intelligence of the answer is a direct function of the quality of the retrieval. We are not building an AI wrapper. We are building the most accurate private retrieval engine on the planet.',
  },
  {
    num: '03',
    title: 'Consistency',
    subtitle: 'Same question. Same answer.',
    body: 'We use deterministic tiebreakers, source authority scoring, and priority-ranked indexing to ensure the same query returns consistent, traceable answers — every time.',
  },
  {
    num: '04',
    title: 'Honesty',
    subtitle: '"I don\'t know" is a valid answer',
    body: 'A system that admits the limits of its knowledge is more trustworthy than one that fabricates beyond them. Confidence gating is a core feature, not a fallback.',
  },
  {
    num: '05',
    title: 'Ownership',
    subtitle: 'Own the stack. Own the moat.',
    body: 'No third-party vector DB. No managed dependencies. Full control from byte to answer. The infrastructure advantage compounds over time — and it cannot be copied by a product pivot.',
  },
  {
    num: '06',
    title: 'Scale',
    subtitle: 'Built for the real world',
    body: 'Billion-vector scale from day one. S3 at the foundation. Custom indexing that performs competitively with in-memory solutions without the cost or fragility.',
  },
]

export default function DoctrineGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1A1C20] rounded-[8px] overflow-hidden">
      {doctrines.map((doctrine, idx) => (
        <div
          key={idx}
          className={`p-4 bg-[#0A0B0D] border-[#1A1C20] ${
            idx % 3 !== 2 ? 'border-r' : ''
          } ${idx < 3 ? 'border-b' : ''}`}
        >
          <p className="text-[8px] font-mono text-[#2A2C32] mb-1">
            {doctrine.num} / {doctrine.title}
          </p>
          <p className="text-[9px] font-mono text-[#8A8D96] mb-2">
            {doctrine.subtitle}
          </p>
          <p className="text-[8px] font-mono text-[#3A3D45] leading-[1.6]">
            {doctrine.body}
          </p>
        </div>
      ))}
    </div>
  )
}
