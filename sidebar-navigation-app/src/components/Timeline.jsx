function formatDateTime(iso) {
  return new Date(iso).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Timeline({ entries }) {
  if (!entries || entries.length === 0) {
    return <p className="text-sm text-[#535862]">Belum ada aktivitas tercatat.</p>
  }

  const sorted = [...entries].sort((a, b) => new Date(b.at) - new Date(a.at))

  return (
    <ol className="flex flex-col gap-4">
      {sorted.map((entry, i) => (
        <li key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-[#7f56d9]" />
            {i < sorted.length - 1 && <span className="w-px flex-1 bg-[#e9eaeb]" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium text-[#181d27]">
              {entry.action} <span className="font-normal text-[#535862]">· {entry.actor}</span>
            </p>
            {entry.note && <p className="mt-0.5 text-sm text-[#535862]">{entry.note}</p>}
            <p className="mt-0.5 text-xs text-[#717680]">{formatDateTime(entry.at)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default Timeline
