import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import Hero from '@/components/manifesto/hero'
import Section from '@/components/manifesto/section'
import DoctrineGrid from '@/components/manifesto/doctrine-grid'
import Footer from '@/components/site/footer'
import FounderSocial from '@/components/manifesto/founder-social'

export const metadata: Metadata = {
  title: 'Manifesto · Enclave',
  description: 'The Company Brain for organizations that cannot send their data to SaaS AI vendors.',
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      <Navigation theme="dark" />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Hero />

        <Section num="I" title="The problem buyers already have">
          <p className="text-manifesto-body mb-4">
            Your security team killed Copilot. Your data cannot leave your VPC. Your employees are still using shadow ChatGPT because there is no approved alternative that can answer questions across your company knowledge.
          </p>
          <p className="text-manifesto-body mb-4">
            The need is obvious: people want one place to ask what the company knows. The blocker is not demand. The blocker is trust, control, and deployment.
          </p>
          <p className="text-manifesto-body">
            Enclave exists for the organizations that want enterprise AI, but cannot approve a product that asks them to send regulated, proprietary, or customer-sensitive data into someone else&apos;s cloud.
          </p>
        </Section>

        <Section num="II" title="The category">
          <p className="text-manifesto-body mb-4">
            Enclave is the Company Brain for organizations that cannot send their data to SaaS AI vendors.
          </p>
          <p className="text-manifesto-body mb-4">
            It connects what your company already knows — across Slack, Drive, GitHub, Confluence, Jira, and the rest — and lets employees ask natural-language questions that come back with sourced answers.
          </p>
          <p className="text-manifesto-body">
            The buyer outcome is simple: approved AI for internal knowledge, without forcing legal, security, or compliance to accept a deployment model they already rejected.
          </p>
        </Section>

        <Section num="III" title="The architectural claim">
          <p className="text-manifesto-body mb-4">
            Enclave deploys inside your AWS account. Your S3, your KMS keys, your Postgres, your audit logs. GCP and Azure support on the public roadmap; talk to the founder about your environment.
          </p>
          <p className="text-manifesto-body mb-4">
            Our principals are excluded from your key policies. We do not operate a service inside your perimeter. Your private knowledge stays under your infrastructure, your governance, and your audit surface.
          </p>
          <p className="text-manifesto-body">
            Every AI company says it values privacy. Enclave is built so privacy is not a promise in a sales deck. It is the deployment boundary.
          </p>
        </Section>

        <Section num="IV" title="The evidence">
          <p className="text-manifesto-body mb-6">
            The lower layers matter because this claim cannot be added later. A sovereign Company Brain needs storage, retrieval, ranking, and observability designed around customer-owned infrastructure from the first commit.
          </p>
          <DoctrineGrid />
        </Section>

        <Section num="V" title="Who Enclave is for">
          <p className="text-manifesto-body mb-4">
            Enclave is for regulated, security-conscious, and infrastructure-serious companies that need the productivity of AI without the control loss of SaaS AI.
          </p>
          <p className="text-manifesto-body mb-4">
            It is for the security leader who needs an approved alternative to shadow AI. The legal team that needs answers with sources. The engineering team that cannot afford to lose decisions across Slack, docs, tickets, and email.
          </p>
          <p className="text-manifesto-body">
            If your company can use a standard SaaS Company Brain, you probably should. Enclave is for the moment when that deployment model is the reason the project cannot ship.
          </p>
        </Section>

        <Section num="VI" title="What Enclave is not">
          <p className="text-manifesto-body">
            Enclave is not a chat product. It is not a SaaS. It is not a model. It is the retrieval and knowledge infrastructure that sits underneath whatever LLM your organisation already trusts — Bedrock, Azure OpenAI, your own Vertex, or a local Mistral. We are the substrate, not the answer engine. We do not train on your data, because we never see it.
          </p>
        </Section>

        <Section num="VII" title="The founder note">
          <p className="text-manifesto-body mb-4">
            Enclave is being built by a solo engineer who got tired of every AI company asking enterprises to trust their cloud.
          </p>
          <p className="text-manifesto-body mb-4">
            The first version is for design partners with real constraints: private data, serious compliance pressure, and employees who still need AI to do their best work.
          </p>
          <p className="text-manifesto-body">
            Design partners welcome. Talk directly to the founder: contact@getenclave.ai.
          </p>
        </Section>

        <div className="py-16 border-t border-[#1A1C20] mt-16">
          <p className="text-[26px] font-bold text-[#E8E9EC] leading-[1.15] tracking-[-0.02em] mb-8">
            The Company Brain<br />
            your security team can actually approve.<br />
            Because nothing leaves your perimeter.
          </p>
          <a
            href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
            className="inline-flex text-xs font-bold px-4 py-2 mb-8 bg-[#E8E9EC] text-[#0A0B0D] rounded-[4px] hover:bg-[#F4F5F7] active:scale-[0.97] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            get on a design-partner call
          </a>
          <p className="text-manifesto-caption mb-4">
            Shashank Bhardwaj, Founder · getenclave.ai
          </p>
          <FounderSocial />
        </div>
      </main>

      <Footer theme="dark" />
    </div>
  )
}
