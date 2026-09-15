import { handoffChecklist } from '../lib/handoff'
import { CheckIcon, XIcon } from './icons'

function HandoffChecklist({ request }) {
  const { items, allPass } = handoffChecklist(request)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.key} className="flex items-start gap-2">
          <span
            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
              item.pass ? 'bg-[#ecfdf3] text-[#067647]' : 'bg-[#fef3f2] text-[#b42318]'
            }`}
          >
            {item.pass ? <CheckIcon className="size-3.5" /> : <XIcon className="size-3.5" />}
          </span>
          <div>
            <p className="text-sm text-[#181d27]">{item.label}</p>
            {item.detail && <p className="text-sm text-[#b42318]">{item.detail}</p>}
          </div>
        </div>
      ))}
      {!allPass && (
        <p className="mt-1 text-sm font-medium text-[#b54708]">
          Request belum bisa ditandai siap handoff sampai semua syarat di atas terpenuhi.
        </p>
      )}
    </div>
  )
}

export default HandoffChecklist
