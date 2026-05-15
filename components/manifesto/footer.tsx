'use client'

export default function Footer() {
  return (
    <footer className="bg-[#080909] border-t border-[#1A1C20] py-6">
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
        <p className="text-[11px] font-mono text-[#9499A6] tracking-[0.06em]">
          enclave · getenclave.ai
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-[9px] font-mono text-[#9499A6] hover:text-[#B4B8C2] transition-colors">
            © 2026
          </a>
          <a href="#" className="text-[9px] font-mono text-[#9499A6] hover:text-[#B4B8C2] transition-colors">
            privacy
          </a>
          <a href="#" className="text-[9px] font-mono text-[#9499A6] hover:text-[#B4B8C2] transition-colors">
            shashank bhardwaj
          </a>
        </div>
      </div>
    </footer>
  )
}
