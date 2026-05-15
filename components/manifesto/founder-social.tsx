import { Linkedin } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/shashank-bhardwaj-1a92b9213/'
const X_URL = 'https://x.com/theghost1623'

const linkClass =
  'text-[#9499A6] hover:text-[#B4B8C2] transition-colors'

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function FounderSocial() {
  return (
    <div className="flex items-center gap-4">
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkClass}
      >
        <Linkedin className="w-4 h-4" strokeWidth={1.5} />
      </a>
      <a
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className={linkClass}
      >
        <XIcon className="w-4 h-4" />
      </a>
    </div>
  )
}
