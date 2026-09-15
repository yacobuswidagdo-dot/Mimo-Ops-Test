export const WORKFLOW_TYPES = [
  {
    key: 'invoice_approval',
    label: 'Invoice Approval',
    description: 'Persetujuan invoice dari vendor/partner',
    fields: [
      { key: 'partner', label: 'Nama vendor/partner', type: 'text', required: true },
      { key: 'invoiceNumber', label: 'Nomor invoice', type: 'text', required: true },
      { key: 'dueDate', label: 'Jatuh tempo', type: 'date', required: true },
      { key: 'description', label: 'Deskripsi/keperluan', type: 'textarea', required: true },
    ],
    minDocuments: 1,
    documentHint: 'Unggah minimal 1 dokumen invoice (PDF/gambar)',
  },
  {
    key: 'payment_request',
    label: 'Payment Request',
    description: 'Permintaan pembayaran ke pihak ketiga',
    fields: [
      { key: 'partner', label: 'Nama penerima', type: 'text', required: true },
      { key: 'bankAccount', label: 'Rekening tujuan', type: 'text', required: true },
      { key: 'dueDate', label: 'Tanggal pembayaran diharapkan', type: 'date', required: true },
      { key: 'description', label: 'Keperluan pembayaran', type: 'textarea', required: true },
    ],
    minDocuments: 1,
    documentHint: 'Unggah minimal 1 dokumen pendukung (kontrak/invoice/PO)',
  },
  {
    key: 'reimbursement',
    label: 'Reimbursement',
    description: 'Klaim penggantian biaya pribadi karyawan',
    fields: [
      { key: 'partner', label: 'Nama pengklaim', type: 'text', required: true },
      { key: 'category', label: 'Kategori biaya', type: 'text', required: true },
      { key: 'expenseDate', label: 'Tanggal pengeluaran', type: 'date', required: true },
      { key: 'description', label: 'Rincian pengeluaran', type: 'textarea', required: true },
    ],
    minDocuments: 1,
    documentHint: 'Unggah minimal 1 struk/bukti pengeluaran',
  },
]

export function getWorkflowType(key) {
  return WORKFLOW_TYPES.find((w) => w.key === key)
}

// Request lifecycle status. Each entry carries the label + badge tone used
// across the queue, detail header, and audit trail.
export const STATUS = {
  draft: { label: 'Draft', tone: 'gray' },
  submitted: { label: 'Diajukan', tone: 'gray' },
  in_review: { label: 'Direview finance', tone: 'amber' },
  returned_for_revision: { label: 'Perlu revisi', tone: 'red' },
  pending_approval: { label: 'Menunggu approval', tone: 'amber' },
  approved: { label: 'Disetujui', tone: 'green' },
  rejected: { label: 'Ditolak', tone: 'red' },
  ready_for_handoff: { label: 'Siap handoff', tone: 'green' },
  handoff_blocked: { label: 'Handoff terblokir', tone: 'red' },
  handed_off: { label: 'Selesai · di Xero', tone: 'green' },
}

export function statusInfo(status) {
  return STATUS[status] || { label: status, tone: 'gray' }
}
