import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { getWorkflowType } from '../data/workflowTypes'

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('id-ID').format(amount) + (currency === 'IDR' ? '' : ` ${currency}`)
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function nextActionFor(request) {
  switch (request.status) {
    case 'submitted':
    case 'in_review':
      return 'Menunggu review finance'
    case 'returned_for_revision':
      return 'Perlu direvisi requester'
    case 'pending_approval':
      return 'Menunggu keputusan approver'
    case 'approved':
      return 'Siap ditandai handoff'
    case 'ready_for_handoff':
      return 'Siap dikirim ke Xero'
    case 'handoff_blocked':
      return 'Perbaiki syarat handoff'
    case 'rejected':
      return 'Tidak ada tindakan'
    case 'handed_off':
      return 'Selesai'
    default:
      return '—'
  }
}

function RequestTable({ rows }) {
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#e9eaeb] bg-white shadow-sm">
      <div className="flex w-full items-center border-b border-[#e9eaeb] bg-[#fafafa]">
        <div className="flex flex-1 items-center px-4 py-2.5">
          <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">ID · Requester</p>
        </div>
        <div className="flex w-[160px] items-center px-4 py-2.5">
          <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">Tipe</p>
        </div>
        <div className="flex w-[140px] items-center px-4 py-2.5">
          <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">Nominal</p>
        </div>
        <div className="flex w-[160px] items-center px-4 py-2.5">
          <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">Status</p>
        </div>
        <div className="flex w-[240px] items-center px-4 py-2.5">
          <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">Next action</p>
        </div>
        <div className="flex w-[120px] items-center px-4 py-2.5">
          <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">Diperbarui</p>
        </div>
      </div>

      {rows.map((row) => (
        <button
          key={row.id}
          type="button"
          onClick={() => navigate(`/requests/${row.id}`)}
          className="flex w-full items-center border-b border-[#e9eaeb] p-4 text-left last:border-b-0 hover:bg-[#fafafa]"
        >
          <div className="flex flex-1 flex-col text-sm leading-5">
            <p className="font-medium text-[#181d27]">{row.id}</p>
            <p className="text-[#535862]">{row.requester}</p>
          </div>
          <div className="w-[160px] text-sm text-[#535862]">{getWorkflowType(row.type)?.label}</div>
          <div className="w-[140px] text-sm text-[#535862]">{formatCurrency(row.amount, row.currency)}</div>
          <div className="w-[160px]">
            <StatusBadge status={row.status} />
          </div>
          <div className="w-[240px] text-sm text-[#535862]">{nextActionFor(row)}</div>
          <div className="w-[120px] text-sm text-[#535862]">{formatDate(row.updatedAt)}</div>
        </button>
      ))}
    </div>
  )
}

export default RequestTable
