import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { can, canSeeRequest } from '../lib/permissions'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import Badge from '../components/Badge'
import EmptyState from '../components/EmptyState'
import RequestTable from '../components/RequestTable'
import { SearchIcon } from '../components/icons'
import Spinner from '../components/Spinner'

const NEEDS_ACTION = ['submitted', 'in_review', 'returned_for_revision', 'pending_approval', 'handoff_blocked']

const TABS = [
  { key: 'needs_action', label: 'Perlu tindakan', statuses: NEEDS_ACTION },
  { key: 'approved', label: 'Disetujui', statuses: ['approved', 'ready_for_handoff'] },
  { key: 'handed_off', label: 'Selesai', statuses: ['handed_off'] },
  { key: 'rejected', label: 'Ditolak', statuses: ['rejected'] },
  { key: 'all', label: 'Semua', statuses: null },
]

function RequestListPage() {
  const { requests, role, currentUser } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('needs_action')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  const visible = useMemo(
    () => requests.filter((r) => canSeeRequest(role, r, currentUser)),
    [requests, role, currentUser],
  )

  const tabCounts = useMemo(
    () =>
      Object.fromEntries(
        TABS.map((t) => [t.key, t.statuses ? visible.filter((r) => t.statuses.includes(r.status)).length : visible.length]),
      ),
    [visible],
  )

  const filtered = useMemo(() => {
    const activeTab = TABS.find((t) => t.key === tab)
    let rows = activeTab.statuses ? visible.filter((r) => activeTab.statuses.includes(r.status)) : visible
    const q = query.trim().toLowerCase()
    if (q) {
      rows = rows.filter((r) =>
        [r.id, r.requester, r.fields?.partner, String(r.amount)].some((f) => (f || '').toLowerCase().includes(q)),
      )
    }
    return rows
  }, [visible, tab, query])

  return (
    <>
      <PageHeader
        title="Requests"
        subtitle={`${visible.length} request · queue Accounting & Finance`}
        actions={
          can(role, 'create_request') ? (
            <Button variant="primary" onClick={() => navigate('/requests/new')}>
              Ajukan request baru
            </Button>
          ) : (
            <span className="text-sm text-[#717680]" title="Peran ini tidak dapat membuat request baru">
              Peran ini hanya bisa melihat, tidak membuat request baru
            </span>
          )
        }
      />

      <div className="flex w-full items-center gap-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex h-9 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold whitespace-nowrap ${
              tab === t.key ? 'bg-white text-[#414651] shadow-sm' : 'text-[#717680]'
            }`}
          >
            {t.label}
            <Badge tone={t.key === 'rejected' ? 'red' : 'gray'}>{tabCounts[t.key]}</Badge>
          </button>
        ))}
      </div>

      <div className="flex w-full items-center gap-2 rounded-lg border border-[#d5d7da] bg-white px-3.5 py-2.5 shadow-xs">
        <SearchIcon className="size-5 text-[#717680]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari ID request, requester, partner, atau nominal"
          className="w-full text-base text-[#181d27] placeholder:text-[#717680] focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center gap-2 p-16 text-sm text-[#535862]">
          <Spinner />
          Memuat request…
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada request"
          description="Tidak ada request yang cocok dengan filter atau pencarian saat ini."
        />
      ) : (
        <RequestTable rows={filtered} />
      )}
    </>
  )
}

export default RequestListPage
