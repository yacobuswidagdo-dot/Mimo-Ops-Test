// Mock RBAC for this prototype. There is no real auth backend — "role" is a
// dev/demo switch (see RoleSwitcher) that stands in for a logged-in user's
// permission set, so PRD requirement FR6 (role-based access) and the
// no-permission state can be demonstrated end-to-end in the UI.

export const ROLES = [
  { key: 'finance_admin', label: 'Finance Admin' },
  { key: 'accountant', label: 'Accountant' },
  { key: 'finance_manager', label: 'Finance Manager / Approver' },
  { key: 'treasury_operator', label: 'Treasury / Payment Operator' },
  { key: 'auditor', label: 'Auditor / Compliance Reviewer' },
  { key: 'requester', label: 'Requester (karyawan umum)' },
]

// least-privilege: everything defaults to false unless granted below
const GRANTS = {
  finance_admin: ['create_request', 'review_request', 'mark_handoff_ready', 'view_all_requests'],
  accountant: ['create_request', 'review_request', 'mark_handoff_ready', 'view_all_requests'],
  finance_manager: ['approve_request', 'view_all_requests'],
  treasury_operator: ['view_payment_requests'],
  auditor: ['view_all_requests', 'view_audit_trail'],
  requester: ['create_request', 'view_own_requests'],
}

export function can(role, permission) {
  return (GRANTS[role] || []).includes(permission)
}

export function roleLabel(role) {
  return ROLES.find((r) => r.key === role)?.label || role
}

export function canSeeRequest(role, request, currentUserName) {
  if (can(role, 'view_all_requests')) return true
  if (can(role, 'view_payment_requests')) return request.type === 'payment_request'
  if (can(role, 'view_own_requests')) return request.requester === currentUserName
  return false
}
