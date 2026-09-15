import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SEED_REQUESTS } from '../data/seedRequests'
import { handoffChecklist } from '../lib/handoff'
import { nextAuditId, nextRequestId } from '../lib/id'
import { useLocalStorageState } from '../lib/storage'

const AppContext = createContext(null)

const CURRENT_USER = 'A. Prakoso' // stand-in for the signed-in user in this prototype

function withAudit(request, actor, action, note) {
  return {
    ...request,
    updatedAt: new Date().toISOString(),
    auditTrail: [
      ...request.auditTrail,
      { id: nextAuditId(), at: new Date().toISOString(), actor, action, note: note || undefined },
    ],
  }
}

// Simulated network latency so loading states are real to see, not instant.
function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function AppProvider({ children }) {
  const [requests, setRequests] = useLocalStorageState('neralink.requests', SEED_REQUESTS)
  const [role, setRole] = useLocalStorageState('neralink.role', 'finance_admin')
  const [toasts, setToasts] = useState([])
  const [isOnline, setIsOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const pushToast = useCallback((message, tone = 'success') => {
    const id = nextAuditId()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  const getRequest = useCallback((id) => requests.find((r) => r.id === id), [requests])

  const updateRequest = useCallback(
    (id, updater) => {
      setRequests((prev) => prev.map((r) => (r.id === id ? updater(r) : r)))
    },
    [setRequests],
  )

  const createRequest = useCallback(
    async ({ type, fields, documents }) => {
      await delay()
      const id = nextRequestId(requests)
      const amount = Number(fields.amount) || 0
      const now = new Date().toISOString()
      const draft = {
        id,
        type,
        requester: CURRENT_USER,
        owner: CURRENT_USER,
        amount,
        currency: 'IDR',
        status: 'submitted',
        fields,
        documents: documents.map((name) => ({ name })),
        createdAt: now,
        updatedAt: now,
        auditTrail: [],
      }
      const withEntry = withAudit(draft, CURRENT_USER, 'Request diajukan')
      setRequests((prev) => [withEntry, ...prev])
      pushToast(`${id} berhasil diajukan`)
      return withEntry
    },
    [requests, setRequests, pushToast],
  )

  const returnForRevision = useCallback(
    async (id, note) => {
      await delay()
      updateRequest(id, (r) => withAudit({ ...r, status: 'returned_for_revision' }, role, 'Dikembalikan untuk revisi', note))
      pushToast(`${id} dikembalikan untuk revisi`, 'warning')
    },
    [updateRequest, role, pushToast],
  )

  const forwardToApproval = useCallback(
    async (id) => {
      await delay()
      updateRequest(id, (r) => withAudit({ ...r, status: 'pending_approval' }, role, 'Diteruskan ke approval'))
      pushToast(`${id} diteruskan ke approval`)
    },
    [updateRequest, role, pushToast],
  )

  const approveRequest = useCallback(
    async (id) => {
      await delay()
      updateRequest(id, (r) => withAudit({ ...r, status: 'approved' }, role, 'Disetujui'))
      pushToast(`${id} disetujui`)
    },
    [updateRequest, role, pushToast],
  )

  const rejectRequest = useCallback(
    async (id, note) => {
      await delay()
      updateRequest(id, (r) => withAudit({ ...r, status: 'rejected' }, role, 'Ditolak', note))
      pushToast(`${id} ditolak`, 'warning')
    },
    [updateRequest, role, pushToast],
  )

  const markHandoffReady = useCallback(
    async (id) => {
      await delay()
      const request = getRequest(id)
      const { allPass } = handoffChecklist(request)
      if (!allPass) {
        pushToast(`${id} belum memenuhi syarat handoff`, 'error')
        return
      }
      updateRequest(id, (r) => withAudit({ ...r, status: 'ready_for_handoff' }, role, 'Ditandai siap handoff'))
      pushToast(`${id} siap untuk handoff`)
    },
    [getRequest, updateRequest, role, pushToast],
  )

  const performHandoff = useCallback(
    async (id) => {
      await delay(900)
      const request = getRequest(id)
      const { allPass } = handoffChecklist(request)
      if (!allPass) {
        updateRequest(id, (r) =>
          withAudit({ ...r, status: 'handoff_blocked' }, role, 'Handoff gagal', 'Syarat minimum belum terpenuhi'),
        )
        pushToast(`Handoff ${id} gagal — syarat belum terpenuhi`, 'error')
        return
      }
      updateRequest(id, (r) => withAudit({ ...r, status: 'handed_off' }, role, 'Handoff ke Xero berhasil'))
      pushToast(`${id} berhasil di-handoff ke Xero`)
    },
    [getRequest, updateRequest, role, pushToast],
  )

  const resubmitRequest = useCallback(
    async (id, { fields, documents }) => {
      await delay()
      updateRequest(id, (r) =>
        withAudit(
          { ...r, status: 'submitted', fields: { ...r.fields, ...fields }, documents: documents ?? r.documents },
          CURRENT_USER,
          'Request diajukan ulang setelah revisi',
        ),
      )
      pushToast(`${id} diajukan ulang`)
    },
    [updateRequest, pushToast],
  )

  const value = useMemo(
    () => ({
      requests,
      role,
      setRole,
      currentUser: CURRENT_USER,
      isOnline,
      toasts,
      getRequest,
      createRequest,
      returnForRevision,
      forwardToApproval,
      approveRequest,
      rejectRequest,
      markHandoffReady,
      performHandoff,
      resubmitRequest,
    }),
    [
      requests,
      role,
      setRole,
      isOnline,
      toasts,
      getRequest,
      createRequest,
      returnForRevision,
      forwardToApproval,
      approveRequest,
      rejectRequest,
      markHandoffReady,
      performHandoff,
      resubmitRequest,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
