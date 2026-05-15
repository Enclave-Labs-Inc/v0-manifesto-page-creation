interface PullQuoteProps {
  text: string
}

export default function PullQuote({ text }: PullQuoteProps) {
  return (
    <div className="my-8 pl-4 border-l-2 border-[#E8E9EC]">
      <p className="text-[15px] font-serif italic text-[#8A8D96] leading-[1.5]">
        "{text}"
      </p>
    </div>
  )
}
