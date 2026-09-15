let counter = 0

export function nextRequestId(existing = []) {
  const max = existing.reduce((m, r) => {
    const n = parseInt(r.id.replace('REQ-', ''), 10)
    return Number.isFinite(n) ? Math.max(m, n) : m
  }, 1000)
  counter = Math.max(counter, max) + 1
  return `REQ-${counter}`
}

export function nextAuditId() {
  return `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
