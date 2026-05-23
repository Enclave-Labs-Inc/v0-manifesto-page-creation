export default function ProblemSection() {
  return (
    <section className="border-b border-[#1A1C20]">
      <div className="max-w-7xl mx-auto px-6 py-[clamp(4rem,8vw,6rem)]">
        <div className="grid lg:grid-cols-[0.35fr_1fr] gap-10 lg:gap-20">
          <p className="text-manifesto-label pt-1">the blocker</p>

          <div>
            <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-serif italic text-[#E8E9EC] leading-[1.2] max-w-[28ch] mb-10">
              Your team killed Copilot. Your people still use shadow AI.
            </p>

            <div className="space-y-6 max-w-[52ch]">
              <p className="text-manifesto-body">
                The need is obvious: one approved place to ask what the company knows. The blocker is not demand. It is trust, control, and deployment.
              </p>
              <p className="text-manifesto-body">
                Enclave exists for organizations that want enterprise AI, but cannot send regulated, proprietary, or customer-sensitive data into someone else&apos;s cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
