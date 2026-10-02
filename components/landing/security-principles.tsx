export default function SecurityPrinciples() {
  return (
    <section className="bg-[#F5F5F2] text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-20 sm:px-10 lg:px-14 lg:pt-12 lg:pb-24">
        <div className="max-w-[760px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
            Built around your existing security
          </p>

          <h2 className="mt-5 font-display text-[clamp(2.4rem,4.5vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.035em]">
            Same data. Same permissions.
            <span className="block text-[#6A6D72]">
              Enclave works with your existing access rules.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-[#D8D8D3] bg-[#D8D8D3] md:grid-cols-2">
          <div className="bg-[#F5F5F2] p-8 sm:p-10">
            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
              People only see what they are allowed to see
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-[#55585D]">
              Answers only use information the person asking is already allowed to see.
            </p>
          </div>

          <div className="bg-[#F5F5F2] p-8 sm:p-10">
            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
              Every answer shows its sources
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-[#55585D]">
              Employees can see where the answer came from and verify it themselves.
            </p>
          </div>

          <div className="bg-[#F5F5F2] p-8 sm:p-10">
            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
              Your data stays in your cloud
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-[#55585D]">
              Your storage, encryption keys, database and audit logs remain under your control.
            </p>
          </div>

          <div className="bg-[#F5F5F2] p-8 sm:p-10">
            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
              Use the model you already trust
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-[#55585D]">
              Enclave sits underneath the LLM your company has already approved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
