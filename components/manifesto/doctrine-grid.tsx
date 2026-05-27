const doctrines = [
  {
    num: '01',
    title: 'Deployment',
    subtitle: 'Runs inside your AWS account',
    body: 'GCP, Azure, and on-prem on the roadmap, delivered when a design partner requires them. Enclave is deployed into infrastructure you control, not routed through infrastructure you have to trust.',
  },
  {
    num: '02',
    title: 'Exclusion',
    subtitle: 'Vendor access is designed out',
    body: 'Our principals are excluded from your key policies. We do not operate a service inside your perimeter. Sovereignty is not a promise; it is an architectural property.',
  },
  {
    num: '03',
    title: 'Approval',
    subtitle: 'A sanctioned alternative to shadow AI',
    body: 'Employees are already using AI. Regulated teams need an approved Company Brain that gives them useful answers without forcing security to accept SaaS data exposure.',
  },
  {
    num: '04',
    title: 'Traceability',
    subtitle: 'Every answer points back to evidence',
    body: 'Answers must be sourced, consistent, and auditable. When the evidence is thin, Enclave refuses to guess. Honest uncertainty is a feature, not a failure mode.',
  },
  {
    num: '05',
    title: 'Retrieval',
    subtitle: 'The moat is below the UI',
    body: 'Rust shard workers, byte-level vector formats, deterministic ranking, and source authority scoring exist for one reason: to make the sovereignty claim real at production scale.',
  },
  {
    num: '06',
    title: 'Outcome',
    subtitle: 'Useful AI your buyer can approve',
    body: 'The goal is not another search box. The goal is an internal AI system legal, security, and business teams can all say yes to.',
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
          <p className="text-[10px] font-bold text-[#9499A6] mb-1.5">
            {doctrine.num} / {doctrine.title}
          </p>
          <p className="text-[11px] font-bold text-[#B4B8C2] mb-2">
            {doctrine.subtitle}
          </p>
          <p className="text-[10px] text-[#AEB3BC] leading-[1.65]">
            {doctrine.body}
          </p>
        </div>
      ))}
    </div>
  )
}
