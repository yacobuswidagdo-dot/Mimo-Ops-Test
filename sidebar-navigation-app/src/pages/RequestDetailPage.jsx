import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { can } from '../lib/permissions'
import { getWorkflowType } from '../data/workflowTypes'
import { handoffChecklist } from '../lib/handoff'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import NoPermission from '../components/NoPermission'
import Timeline from '../components/Timeline'
import HandoffChecklist from '../components/HandoffChecklist'
import ReasonDialog from '../components/ReasonDialog'
import { ArrowLeftIcon } from '../components/icons'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'audit', label: 'Audit Trail' },
  { key: 'handoff', label: 'Handoff Readiness' },
]

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('id-ID').format(amount) + (currency === 'IDR' ? '' : ` ${currency}`)
}

function ActionBar({ request }) {
  const { role, returnForRevision, forwardToApproval, approveRequest, rejectRequest, markHandoffReady, performHandoff, resubmitRequest } =
    useApp()
  const [busy, setBusy] = useState(false)
  const [dialog, setDialog] = useState(null) // 'return' | 'reject' | null

  async function run(fn) {
    setBusy(true)
    await fn()
    setBusy(false)
  }

  if (['submitted', 'in_review'].includes(request.status)) {
    if (!can(role, 'review_request')) return <NoPermission message="Hanya Finance Admin/Accountant yang dapat mereview request ini." />
    return (
      <div className="flex gap-3">
        <Button variant="secondary" disabled={busy} onClick={() => setDialog('return')}>
          Kembalikan untuk revisi
        </Button>
        <Button variant="primary" disabled={busy} onClick={() => run(() => forwardToApproval(request.id))}>
          {busy && <Spinner className="size-4" />}
          Teruskan ke approval
        </Button>
        {dialog === 'return' && (
          <ReasonDialog
            title="Kembalikan untuk revisi"
            description="Jelaskan apa yang perlu diperbaiki requester."
            confirmLabel="Kembalikan"
            onConfirm={(reason) => returnForRevision(request.id, reason)}
            onClose={() => setDialog(null)}
          />
        )}
      </div>
    )
  }

  if (request.status === 'returned_for_revision') {
    if (!can(role, 'create_request')) return <NoPermission message="Menunggu requester mengajukan ulang request ini." />
    return (
      <Button variant="primary" disabled={busy} onClick={() => run(() => resubmitRequest(request.id, { fields: request.fields }))}>
        {busy && <Spinner className="size-4" />}
        Ajukan ulang request
      </Button>
    )
  }

  if (request.status === 'pending_approval') {
    if (!can(role, 'approve_request')) return <NoPermission message="Hanya Finance Manager/Approver yang dapat memutuskan request ini." />
    return (
      <div className="flex gap-3">
        <Button variant="secondary" disabled={busy} onClick={() => setDialog('reject')}>
          Tolak
        </Button>
        <Button variant="primary" disabled={busy} onClick={() => run(() => approveRequest(request.id))}>
          {busy && <Spinner className="size-4" />}
          Setujui
        </Button>
        {dialog === 'reject' && (
          <ReasonDialog
            title="Tolak request"
            description="Jelaskan alasan penolakan untuk requester."
            confirmLabel="Tolak request"
            onConfirm={(reason) => rejectRequest(request.id, reason)}
            onClose={() => setDialog(null)}
          />
        )}
      </div>
    )
  }

  if (request.status === 'approved') {
    if (!can(role, 'mark_handoff_ready')) return <NoPermission message="Hanya Finance Admin/Accountant yang dapat menandai handoff." />
    const { allPass } = handoffChecklist(request)
    return (
      <Button variant="primary" disabled={busy || !allPass} onClick={() => run(() => markHandoffReady(request.id))}>
        {busy && <Spinner className="size-4" />}
        Tandai siap handoff
      </Button>
    )
  }

  if (['ready_for_handoff', 'handoff_blocked'].includes(request.status)) {
    if (!can(role, 'mark_handoff_ready')) return <NoPermission message="Hanya Finance Admin/Accountant yang dapat menjalankan handoff." />
    return (
      <Button variant="primary" disabled={busy} onClick={() => run(() => performHandoff(request.id))}>
        {busy && <Spinner className="size-4" />}
        {request.status === 'handoff_blocked' ? 'Coba handoff lagi' : 'Kirim ke Xero'}
      </Button>
    )
  }

  return <p className="text-sm text-[#535862]">Request ini sudah dalam status final — tidak ada aksi lebih lanjut.</p>
}

function RequestDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRequest } = useApp()
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [id])

  const request = getRequest(id)

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 p-16 text-sm text-[#535862]">
        <Spinner />
        Memuat request…
      </div>
    )
  }

  if (!request) {
    return (
      <EmptyState
        title="Request tidak ditemukan"
        description={`Tidak ada request dengan ID ${id}.`}
        action={
          <Button variant="secondary" onClick={() => navigate('/requests')}>
            Kembali ke daftar request
          </Button>
        }
      />
    )
  }

  const workflow = getWorkflowType(request.type)

  return (
    <>
      <button
        type="button"
        onClick={() => navigate('/requests')}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-[#535862]"
      >
        <ArrowLeftIcon className="size-4" />
        Kembali ke daftar request
      </button>

      <PageHeader
        title={`${request.id} · ${workflow?.label}`}
        subtitle={`Diajukan oleh ${request.requester} · ${formatCurrency(request.amount, request.currency)}`}
        actions={<StatusBadge status={request.status} />}
      />

      <div className="flex w-full items-center gap-1 border-b border-[#e9eaeb]">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-3 py-2.5 text-sm font-semibold ${
              tab === t.key ? 'border-b-2 border-[#7f56d9] text-[#6941c6]' : 'text-[#717680]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="flex w-full flex-col gap-5">
          <div className="rounded-xl border border-[#e9eaeb] bg-white p-6">
            <ActionBar request={request} />
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl border border-[#e9eaeb] bg-white p-6">
            {workflow?.fields.map((f) => (
              <div key={f.key}>
                <p className="text-xs font-medium text-[#717680]">{f.label}</p>
                <p className="text-sm text-[#181d27]">{request.fields?.[f.key] || '—'}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#e9eaeb] bg-white p-6">
            <p className="mb-2 text-sm font-semibold text-[#181d27]">Dokumen</p>
            {request.documents.length === 0 ? (
              <p className="text-sm text-[#535862]">Belum ada dokumen diunggah.</p>
            ) : (
              <ul className="text-sm text-[#181d27]">
                {request.documents.map((d) => (
                  <li key={d.name}>· {d.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === 'audit' && (
        <div className="w-full rounded-xl border border-[#e9eaeb] bg-white p-6">
          <Timeline entries={request.auditTrail} />
        </div>
      )}

      {tab === 'handoff' && (
        <div className="w-full rounded-xl border border-[#e9eaeb] bg-white p-6">
          <HandoffChecklist request={request} />
        </div>
      )}
    </>
  )
}

export default RequestDetailPage
