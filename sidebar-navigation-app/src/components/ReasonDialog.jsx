import { useState } from 'react'
import Button from './Button'
import Spinner from './Spinner'

function ReasonDialog({ title, description, confirmLabel, onConfirm, onClose }) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleConfirm() {
    if (!reason.trim()) {
      setError('Alasan wajib diisi.')
      return
    }
    setSubmitting(true)
    await onConfirm(reason.trim())
    setSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-xl border border-[#e9eaeb] bg-white p-5 shadow-lg">
        <p className="text-base font-semibold text-[#181d27]">{title}</p>
        {description && <p className="mt-1 text-sm text-[#535862]">{description}</p>}
        <textarea
          autoFocus
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
            if (error) setError('')
          }}
          rows={3}
          placeholder="Tulis alasan…"
          className="mt-3 w-full rounded-lg border border-[#d5d7da] px-3.5 py-2.5 text-sm text-[#181d27] placeholder:text-[#717680] focus:outline-none"
        />
        {error && <p className="mt-1 text-sm text-[#b42318]">{error}</p>}
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleConfirm} disabled={submitting}>
            {submitting && <Spinner className="size-4" />}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReasonDialog
