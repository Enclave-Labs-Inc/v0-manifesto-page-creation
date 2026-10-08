'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Eyebrow } from '@/components/landing/eyebrow'
import { ENTITY } from './entity'
import { useReveal } from './use-reveal'

const tabs = [
  {
    id: 'mcp',
    label: 'MCP',
    file: '.mcp.json',
    code: `{
  "mcpServers": {
    "knowledge-graph": {
      "type": "http",
      "url": "https://<your-endpoint>/mcp",
      "headers": { "Authorization": "Bearer <api-key>" }
    }
  }
}`,
  },
  {
    id: 'rest',
    label: 'REST',
    file: 'terminal',
    code: `$ curl https://<your-endpoint>/v1/ask \\
    -H "Authorization: Bearer $API_KEY" \\
    -H "Content-Type: application/json" \\
    -d '{"question": "Which issuers share an auditor?"}'`,
  },
  {
    id: 'python',
    label: 'Python',
    file: 'ask.py',
    code: `import httpx

res = httpx.post(
    "https://<your-endpoint>/v1/ask",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"question": "Who is Meridian's CFO?"},
).json()

for hit in res["payload"]["hits"]:
    fact = hit["fact"]
    print(fact["subject_id"], fact["predicate"], fact["object_id"],
          fact["provenance"]["source_id"])
print("audit:", res["audit_hash"])`,
  },
]

const steps = [
  { n: '1', title: 'Create a project', body: 'Pick a starter, fintech or pharma ontology. Your endpoint is ready in seconds.' },
  { n: '2', title: 'Add your data', body: 'Drag in documents or post them to the API. Text, Markdown and PDF, scanned pages included.' },
  { n: '3', title: 'Connect and ask', body: 'Point an agent at the MCP URL or call REST from your app with a scoped API key.' },
]

const tools = [
  { name: 'ask', desc: 'Question → typed plan → cited hits' },
  { name: 'search', desc: 'Graph retrieval, as of any date' },
  { name: 'traverse', desc: 'Multi-hop walks between entities' },
  { name: 'explain', desc: 'An entity’s dossier, with sources' },
  { name: 'provenance', desc: 'The full chain behind one fact' },
  { name: 'audit_lookup', desc: 'The Article 12 record for a query' },
]

const clients = ['Claude Code', 'Cursor', 'Claude Desktop', 'Any MCP client']

export default function Developers() {
  const [tab, setTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const head = useReveal<HTMLDivElement>()
  const body = useReveal<HTMLDivElement>(0.1)
  const t = tabs[tab]

  function copy() {
    navigator.clipboard?.writeText(t.code.replace(/^\$ /gm, '')).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }

  return (
    <section className="bg-[oklch(0.965_0_0)] text-[#050608]">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(4.5rem,9vw,8rem)] sm:px-10 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal max-w-[900px]">
          <Eyebrow bulletColor={ENTITY.Model}>For developers</Eyebrow>
          <h2 className="font-display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.025em]">
            An endpoint and a key.
            <span className="block text-[#6A6D72]">Nothing to install or run.</span>
          </h2>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-[#DADAD5] bg-[#DADAD5] md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="bg-[oklch(0.985_0_0)] p-6">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12px] text-white"
                style={{ background: [ENTITY.Company, ENTITY.Filing, ENTITY.Model][i] }}
              >
                {s.n}
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#55585D]">{s.body}</p>
            </li>
          ))}
        </ol>

        <div ref={body.ref} data-in-view={body.inView} className="scroll-reveal mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div className="relative overflow-hidden rounded-[12px] border border-[#1A1C20] bg-[#0B0C10] text-[#E8E9EC] shadow-[0_40px_90px_-50px_oklch(0.35_0.1_265/0.8)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 60% at 100% 0%, oklch(0.45 0.15 265 / 0.35) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 0% 100%, oklch(0.5 0.12 175 / 0.2) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center justify-between border-b border-[#1F2229] px-2">
              <div className="flex" role="tablist">
                {tabs.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={i === tab}
                    onClick={() => setTab(i)}
                    className={`relative px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                      i === tab ? 'text-[#F4F5F7]' : 'text-[#5E636F] hover:text-[#9499A6]'
                    }`}
                  >
                    {x.label}
                    {i === tab && <span className="absolute inset-x-4 -bottom-px h-[2px]" style={{ background: '#7FA8F0' }} />}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy code"
                className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-[4px] text-[#5E636F] hover:bg-[#17191E] hover:text-[#E8E9EC]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="relative px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5E636F]">{t.file}</p>
            <pre key={t.id} className="ontos-swap relative min-h-[240px] overflow-x-auto px-5 pt-3 pb-6 font-mono text-[12.5px] leading-[1.8]">
              {t.code.split('\n').map((line, i) => (
                <div key={i}>
                  {line.startsWith('$ ') ? (
                    <>
                      <span className="text-[#5E636F]">$ </span>
                      {line.slice(2)}
                    </>
                  ) : (
                    highlight(line) || ' '
                  )}
                </div>
              ))}
            </pre>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6A6D72]">MCP tools</p>
            <ul className="mt-4 border-t border-[#CFCFCA]">
              {tools.map((x) => (
                <li key={x.name} className="flex items-baseline justify-between gap-6 border-b border-[#CFCFCA] py-3.5">
                  <code className="font-mono text-[13px]">{x.name}</code>
                  <span className="text-right text-[14px] text-[#55585D]">{x.desc}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6A6D72]">Works with</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {clients.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3 py-1.5 text-[12px] text-[#2A2D33] backdrop-blur-md"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Tints quoted strings so the snippets read as code, not a wall of grey. */
function highlight(line: string) {
  if (!line) return null
  return line.split(/("[^"]*")/g).map((part, i) =>
    part.startsWith('"') ? (
      <span key={i} className="text-[#9CC3A6]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
