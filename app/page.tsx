import Navigation from '@/components/manifesto/navigation'
import Hero from '@/components/manifesto/hero'
import Section from '@/components/manifesto/section'
import DoctrineGrid from '@/components/manifesto/doctrine-grid'
import PullQuote from '@/components/manifesto/pull-quote'
import Footer from '@/components/manifesto/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      <Navigation />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Hero />

        {/* Section I */}
        <Section
          num="I"
          title="The problem we refuse to ignore"
        >
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Every organization that grows beyond a handful of people faces the same invisible collapse. Knowledge stops flowing. It fragments. It hides in the wrong tools. It becomes political. Decisions get made with 20% of available context because the other 80% was too expensive to find — buried in Slack, locked in an email thread, last edited by someone who left two years ago.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            This is not a people problem. It is an infrastructure problem. And infrastructure problems have infrastructure solutions.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-6 font-mono">
            The tools built to fix this have made it worse. Enterprise search products that are too expensive, too generic, and too willing to route your most sensitive data through infrastructure you do not own. AI assistants that hallucinate answers about your own internal documents — with complete confidence. You traded one crisis for a more dangerous one: a system that sounds right while being wrong.
          </p>

          <PullQuote text="The biggest challenge for Enterprise AI is that it's still impossible to make sure everyone gets the same answer to the same question, every time. — Mark Cuban, May 2026" />

          <p className="text-[#6B6E78] text-[13px] leading-[1.85] font-mono">
            He is right. And this is the problem Enclave was built to solve at its root — not work around.
          </p>
        </Section>

        {/* Section II */}
        <Section
          num="II"
          title="Why retrieval is the real problem"
        >
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Most people in this industry will tell you hallucination is a model problem. It is not. It is a retrieval problem.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Every RAG system in production today retrieves differently on the same query, because vector similarity is probabilistic. Top-K selection introduces randomness at the most critical moment — before the model ever generates a word. Different chunks arrive. Different evidence is weighted. A different answer emerges. The model doesn't know it received incomplete context. It fills the gaps with fabrication and presents the result as fact.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            The solution is not a smarter model. The solution is a more disciplined retrieval layer. One that uses priority-ranked indexing, source trust scoring, deterministic tiebreakers, and the intellectual honesty to say — when the evidence is thin — that it does not know.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] font-mono">
            We have built this in production. We have broken it and fixed it in real enterprise environments. We know exactly where the existing systems fail. That is not a coincidence — it is the foundation of the technical moat we are building.
          </p>
        </Section>

        {/* Section III */}
        <Section
          num="III"
          title="What makes Enclave different"
        >
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Every other system in this space depends on a third-party vector database — Pinecone, Weaviate, Qdrant. That dependency means cost, latency, vendor lock-in, and most critically: your data leaving your walls.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Enclave is built differently from the substrate up. We have built our own vector storage and indexing layer directly on S3 — a custom HNSW/IVF retrieval architecture designed to perform at billion-vector scale, with intelligent caching that makes retrieval competitive with in-memory solutions. No third-party vector DB. No managed dependency. No data leaving your infrastructure.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] font-mono">
            This is not an optimization. It is a philosophical choice about who owns your company's intelligence.
          </p>
        </Section>

        {/* Section IV */}
        <Section
          num="IV"
          title="The six principles we build by"
        >
          <DoctrineGrid />
        </Section>

        {/* Section V */}
        <Section
          num="V"
          title="Who Enclave is for"
        >
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Enclave is for any organization that has grown past the point where one person can hold the full picture in their head — and is not willing to solve that problem by handing their most sensitive data to a third party.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            It is for the engineering team that needs to find every decision made about a system before rewriting it. For the legal team that needs to know what was ever said about a client without searching through twelve different tools. For the executive who needs to make a high-stakes call with complete organizational context, not a best guess.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] font-mono">
            It is for every company that has ever paid to create knowledge they can no longer find.
          </p>
        </Section>

        {/* Section VI */}
        <Section
          num="VI"
          title="The vision"
        >
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            Enclave is not a search tool. Search implies you know what to look for. Enclave is the operating system for organizational knowledge — the single layer through which every question connects to the collective intelligence of everyone who has ever worked there.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-6 font-mono">
            Connect every data source. Index every document, email, thread, and database. Build a unified, private, sovereign index of your entire institutional memory. Query it in natural language. Trust the answer because you can trace it to the source.
          </p>

          <PullQuote text="The most valuable intelligence in any company is not in any AI model. It is in the people who built it and the documents they left behind. Enclave surfaces both." />
        </Section>

        {/* Section VII */}
        <Section
          num="VII"
          title="The promise"
        >
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            We are building this because we have lived the problem. We have watched production RAG systems hallucinate in front of enterprise clients. We have repaired retrieval pipelines that were silently corrupting the answers that ran a company's decisions. We know what is broken and we know exactly how to fix it.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] mb-4 font-mono">
            The enterprise AI wave is already here. But trust is the bottleneck. Every large organization wants this capability. Almost none of them are willing to send their most sensitive intelligence to someone else's cloud to get it.
          </p>
          <p className="text-[#6B6E78] text-[13px] leading-[1.85] font-mono">
            Enclave is the answer to that. Private. Sovereign. Enterprise-grade from day one.
          </p>
        </Section>

        {/* Closing */}
        <div className="py-16 border-t border-[#1A1C20] mt-16">
          <p className="text-[26px] font-serif italic text-[#E8E9EC] leading-[1.15] mb-8">
            Your company's brain.<br />
            Complete. Private. Always on.
          </p>
          <p className="text-[13px] font-mono text-[#3A3D45] mb-8">
            — Shashank Bhardwaj, Founder · getenclave.ai
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
