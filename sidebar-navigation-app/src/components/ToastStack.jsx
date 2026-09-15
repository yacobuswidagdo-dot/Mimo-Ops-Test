import { useApp } from '../context/AppContext'

const TONE_CLASS = {
  success: 'border-[#abefc6] bg-[#ecfdf3] text-[#067647]',
  warning: 'border-[#fedf89] bg-[#fffaeb] text-[#b54708]',
  error: 'border-[#fecdca] bg-[#fef3f2] text-[#b42318]',
}

function ToastStack() {
  const { toasts } = useApp()

  if (toasts.length === 0) return null

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border px-4 py-3 text-sm font-medium shadow-sm ${TONE_CLASS[toast.tone] || TONE_CLASS.success}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default ToastStack
