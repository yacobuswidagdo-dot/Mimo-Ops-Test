const TONES = {
  gray: 'bg-[#fafafa] border-[#e9eaeb] text-[#414651]',
  red: 'bg-[#fef3f2] border-[#fecdca] text-[#b42318]',
  amber: 'bg-[#fffaeb] border-[#fedf89] text-[#b54708]',
  green: 'bg-[#ecfdf3] border-[#abefc6] text-[#067647]',
}

function Badge({ tone = 'gray', pill = true, children }) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-xs font-medium whitespace-nowrap ${
        pill ? 'rounded-full' : 'rounded-md'
      } ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}

export default Badge
