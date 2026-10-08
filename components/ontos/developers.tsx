'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useReveal } from './use-reveal'

const tabs = [
  {
    id: 'mcp',
    label: 'MCP',
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
    code: `curl https://<your-endpoint>/v1/ask \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"question": "Which issuers share an auditor?"}'`,
  },
]

export default function Developers() {
  const [tab, setTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const head = useReveal<HTMLDivElement>()
  const body = useReveal<HTMLDivElement>(0.1)
  const t = tabs[tab]

  function copy() {
    navigator.clipboard?.writeText(t.code).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }

  return (
    <section className="bg-white text-[#050608]">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-[clamp(6rem,12vw,10rem)] sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal">
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em]">
            An endpoint and a key.
            <span className="block text-[#6A6D72]">Nothing to run.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.65] text-[#55585D]">
            Create a project, drop in documents, and point your agent or app at it. Works with Claude Code,
            Cursor and any MCP client.
          </p>
        </div>

        <div
          ref={body.ref}
          data-in-view={body.inView}
          className="scroll-reveal overflow-hidden rounded-[14px] bg-[#0B0C0F] text-[#E8E9EC]"
        >
          <div className="flex items-center justify-between px-3 pt-3">
            <div className="flex gap-1" role="tablist">
              {tabs.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  onClick={() => setTab(i)}
                  className={`rounded-full px-3 py-1 text-[12px] transition-colors ${
                    i === tab ? 'bg-[#1E2026] text-[#F4F5F7]' : 'text-[#787D8A] hover:text-[#C9CCD3]'
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy code"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#787D8A] hover:bg-[#1E2026] hover:text-[#E8E9EC]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          <pre key={t.id} className="ontos-swap min-h-[230px] overflow-x-auto px-6 pt-5 pb-8 font-mono text-[12px] leading-[1.8] sm:text-[13px]">
            {t.code}
          </pre>
        </div>
      </div>
    </section>
  )
}
