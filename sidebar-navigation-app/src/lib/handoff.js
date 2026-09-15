import { getWorkflowType } from '../data/workflowTypes'

// Business rule (PRD §5): a request may only be marked ready for accounting
// handoff once every minimum condition is met. Returns the checklist plus
// whether it currently passes as a whole.
export function handoffChecklist(request) {
  const workflow = getWorkflowType(request.type)
  const missingFields = (workflow?.fields || []).filter((f) => f.required && !request.fields?.[f.key])

  const items = [
    {
      key: 'approved',
      label: 'Request sudah disetujui approver',
      pass: request.status === 'approved' || request.status === 'ready_for_handoff' || request.status === 'handed_off',
    },
    {
      key: 'fields',
      label: 'Seluruh field wajib terisi',
      pass: missingFields.length === 0,
      detail: missingFields.length > 0 ? `Belum lengkap: ${missingFields.map((f) => f.label).join(', ')}` : null,
    },
    {
      key: 'documents',
      label: `Dokumen minimum terlampir (min. ${workflow?.minDocuments ?? 1})`,
      pass: (request.documents?.length || 0) >= (workflow?.minDocuments ?? 1),
    },
  ]

  return { items, allPass: items.every((i) => i.pass) }
}
