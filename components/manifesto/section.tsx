import React from 'react'

interface SectionProps {
  num: string
  title: string
  children: React.ReactNode
}

export default function Section({ num, title, children }: SectionProps) {
  // Convert number to Roman numerals for section symbol display
  const romanMap: { [key: string]: string } = {
    'I': 'I',
    'II': 'II',
    'III': 'III',
    'IV': 'IV',
    'V': 'V',
    'VI': 'VI',
    'VII': 'VII',
  }
  const roman = romanMap[num] || num

  return (
    <section className="py-16 border-b border-[#1A1C20]">
      {/* Section Bar */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#1A1C20]">
        <div className="flex items-center justify-center w-7 h-7 border border-[#1E2025] rounded-[4px] flex-shrink-0">
          <span className="text-[9px] font-bold text-[#9499A6]">
            § {roman}
          </span>
        </div>
        <h2 className="text-[10px] font-bold text-[#9499A6] tracking-[0.12em] uppercase">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}
