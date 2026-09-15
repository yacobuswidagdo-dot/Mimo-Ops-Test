import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { can } from '../lib/permissions'
import { WORKFLOW_TYPES, getWorkflowType } from '../data/workflowTypes'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import NoPermission from '../components/NoPermission'
import Spinner from '../components/Spinner'

function IntakeFormPage() {
  const { role, createRequest } = useApp()
  const navigate = useNavigate()

  const [typeKey, setTypeKey] = useState(WORKFLOW_TYPES[0].key)
  const [amount, setAmount] = useState('')
  const [fields, setFields] = useState({})
  const [fileNames, setFileNames] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!can(role, 'create_request')) {
    return (
      <>
        <PageHeader title="Ajukan Request Baru" subtitle="Intake form" />
        <NoPermission message="Peran ini tidak dapat mengajukan request baru." />
      </>
    )
  }

  const workflow = getWorkflowType(typeKey)

  function setField(key, value) {
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const nextErrors = {}
    if (!amount || Number(amount) <= 0) nextErrors.amount = 'Nominal wajib diisi dan lebih dari 0.'
    for (const f of workflow.fields) {
      if (f.required && !fields[f.key]?.trim()) {
        nextErrors[f.key] = `${f.label} wajib diisi.`
      }
    }
    if (fileNames.length < workflow.minDocuments) {
      nextErrors.documents = `Minimal ${workflow.minDocuments} dokumen harus diunggah.`
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const created = await createRequest({
      type: typeKey,
      fields: { ...fields, amount },
      documents: fileNames,
    })
    setSubmitting(false)
    navigate(`/requests/${created.id}`)
  }

  return (
    <>
      <PageHeader title="Ajukan Request Baru" subtitle="Lengkapi data dan dokumen sebelum mengirim untuk direview." />

      <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col gap-5 rounded-xl border border-[#e9eaeb] bg-white p-6">
        <div>
          <p className="mb-2 text-sm font-medium text-[#414651]">Jenis request</p>
          <div className="flex gap-2">
            {WORKFLOW_TYPES.map((w) => (
              <button
                key={w.key}
                type="button"
                onClick={() => {
                  setTypeKey(w.key)
                  setFields({})
                  setErrors({})
                }}
                className={`flex-1 rounded-lg border px-3.5 py-2.5 text-left text-sm font-semibold ${
                  typeKey === w.key ? 'border-[#d6bbfb] bg-[#f9f5ff] text-[#6941c6]' : 'border-[#d5d7da] text-[#414651]'
                }`}
              >
                {w.label}
                <p className="mt-0.5 text-xs font-normal text-[#535862]">{w.description}</p>
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#414651]">Nominal (IDR)</span>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
              setErrors((er) => ({ ...er, amount: undefined }))
            }}
            placeholder="0"
            className={`rounded-lg border px-3.5 py-2.5 text-sm text-[#181d27] focus:outline-none ${
              errors.amount ? 'border-[#fda29b]' : 'border-[#d5d7da]'
            }`}
          />
          {errors.amount && <span className="text-sm text-[#b42318]">{errors.amount}</span>}
        </label>

        {workflow.fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[#414651]">{f.label}</span>
            {f.type === 'textarea' ? (
              <textarea
                rows={3}
                value={fields[f.key] || ''}
                onChange={(e) => setField(f.key, e.target.value)}
                className={`rounded-lg border px-3.5 py-2.5 text-sm text-[#181d27] focus:outline-none ${
                  errors[f.key] ? 'border-[#fda29b]' : 'border-[#d5d7da]'
                }`}
              />
            ) : (
              <input
                type={f.type}
                value={fields[f.key] || ''}
                onChange={(e) => setField(f.key, e.target.value)}
                className={`rounded-lg border px-3.5 py-2.5 text-sm text-[#181d27] focus:outline-none ${
                  errors[f.key] ? 'border-[#fda29b]' : 'border-[#d5d7da]'
                }`}
              />
            )}
            {errors[f.key] && <span className="text-sm text-[#b42318]">{errors[f.key]}</span>}
          </label>
        ))}

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#414651]">Dokumen pendukung</span>
          <span className="text-sm text-[#535862]">{workflow.documentHint}</span>
          <input
            type="file"
            multiple
            onChange={(e) => setFileNames(Array.from(e.target.files).map((f) => f.name))}
            className="rounded-lg border border-dashed border-[#d5d7da] px-3.5 py-4 text-sm text-[#535862]"
          />
          {fileNames.length > 0 && (
            <ul className="text-sm text-[#181d27]">
              {fileNames.map((name) => (
                <li key={name}>· {name}</li>
              ))}
            </ul>
          )}
          {errors.documents && <span className="text-sm text-[#b42318]">{errors.documents}</span>}
        </label>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={() => navigate('/requests')} disabled={submitting}>
            Batal
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting && <Spinner className="size-4" />}
            Ajukan request
          </Button>
        </div>
      </form>
    </>
  )
}

export default IntakeFormPage
