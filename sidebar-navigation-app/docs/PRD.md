# PRD v2 — Final

# PRD v2 — Final
## 1\. Ringkasan
### Problem statement
Tim Accounting & Finance saat ini masih menanggung biaya operasional tinggi karena workflow request, approval, dokumentasi, tracking status, dan handoff ke sistem accounting existing masih tersebar, manual, dan tidak konsisten. Di saat yang sama, perusahaan masih bergantung pada Xero sebagai sistem finance/accounting existing, yang menimbulkan biaya vendor dan membatasi fleksibilitas pengembangan proses internal.
### Solusi yang diusulkan
Neralink akan diluncurkan sebagai **minimum production-ready release** untuk workflow dan control layer tim Accounting & Finance. MVP ini akan menangani intake request, finance review, approval, document control, status tracking, audit trail, permission, dan coexistence terkontrol dengan Xero. Setelah MVP stabil dan terbukti memberi pengurangan biaya operasional, Neralink akan diperluas ke payment orchestration, reconciliation, dan secara bertahap mengambil alih accounting record ownership hingga menggantikan Xero.
### Status
*   Draft final v2

* * *
## 2\. Konteks & Latar Belakang
### Kondisi saat ini
*   Sistem existing yang dipakai saat ini adalah **Xero**.
*   Workflow yang dianggap penting:
    *   invoice approval
    *   payment request
    *   reimbursement
    *   reconciliation
*   Ada kebutuhan integrasi dengan:
    *   layanan perpajakan
    *   Midtrans
    *   2C2P
*   Ada kebutuhan compliance yang berat.
*   Ada kebutuhan existing data migration.
*   Target user pertama dan utama adalah tim **Accounting dan Finance**.
*   Objective bisnis utama adalah **cost reduction** melalui pembangunan sistem finance & accounting milik sendiri.
### Problem saat ini
1. Approval dan review masih memerlukan banyak follow-up manual.
2. Request sering bolak-balik karena data atau dokumen tidak lengkap.
3. Status request tidak cukup transparan untuk requester, Finance, dan approver.
4. Audit trail dan jejak keputusan belum cukup terstruktur untuk kebutuhan kontrol dan compliance.
5. Ketergantungan pada Xero menambah vendor cost dan membatasi kemampuan adaptasi proses.
6. Migrasi ke sistem internal baru berisiko tinggi jika dilakukan tanpa boundary yang jelas.
### Bukti/data yang perlu dilengkapi saat final sign-off
*   biaya Xero per bulan/tahun
*   biaya tools pendukung terkait workflow finance
*   waktu rata-rata untuk invoice approval, payment request, reimbursement
*   effort manual reconciliation dan audit preparation
*   jumlah request yang dikembalikan karena data tidak lengkap
*   jumlah exception atau mismatch yang perlu intervensi manual

* * *
## 3\. Tujuan
### Objective utama
Menurunkan total biaya operasi finance & accounting melalui pengurangan kerja manual, peningkatan kontrol proses, dan pengurangan ketergantungan pada vendor eksternal secara bertahap.
### Objective MVP
Membuktikan bahwa Neralink dapat memberikan **quick operational savings** dan **control improvement** pada workflow finance inti tanpa mengganggu integritas accounting existing.
### Success metric
**Primary metric**
*   Penurunan total biaya operasional proses finance untuk workflow yang masuk MVP

**Secondary metrics**
*   Penurunan turnaround time untuk invoice approval, payment request, dan reimbursement
*   Penurunan jumlah request yang bolak-balik karena data atau dokumen tidak lengkap
*   Penurunan follow-up manual di luar sistem

**Counter-metric**
*   Financial error rate tidak boleh naik
*   Compliance issue tidak boleh naik
*   Handoff failure ke accounting existing tidak boleh naik
### Non-goals
*   Full Xero replacement di day 1
*   Ledger ownership penuh pada release awal
*   Advanced reconciliation sebagai workspace utama di MVP
*   Full gateway exception automation di MVP
*   Full historical migration tanpa justifikasi bisnis
*   Mobile parity penuh untuk semua role di MVP
*   AI recommendation, OCR, atau auto-approval canggih di MVP

* * *
## 4\. Target User & Use Case
### Persona / role

| Role | Tujuan | Pain point utama |
| ---| ---| --- |
| Finance Admin | Mengelola intake dan memastikan request bergerak | Request tercecer, status tidak jelas, follow-up tinggi |
| Accountant | Memvalidasi data dan memproses transaksi | Dokumen kurang lengkap, revisi berulang, tracking sulit |
| Finance Manager / Approver | Mengambil keputusan approve/reject | Informasi tersebar, approval lambat, konteks kurang |
| Treasury / Payment Operator | Menjalankan dan memantau pembayaran | Status payment tidak sinkron, exception handling berat |
| Auditor / Compliance Reviewer | Meninjau jejak aksi dan kontrol | Audit trail tidak utuh, bukti sulit ditelusuri |

### Job to be done
*   Sebagai Finance Admin/Accountant, saya ingin memproses request dengan data lengkap, status jelas, dan dokumen yang rapi supaya pekerjaan selesai lebih cepat dan minim follow-up manual.
*   Sebagai Approver, saya ingin melihat konteks transaksi dan dokumen penting dalam satu tempat supaya bisa menyetujui atau menolak permintaan dengan cepat dan aman.
*   Sebagai organisasi, kami ingin memindahkan operasi finance & accounting dari vendor eksternal ke sistem internal secara bertahap supaya biaya turun tanpa mengorbankan kontrol dan compliance.
### Skenario utama
1. Requester mengajukan request melalui flow terstruktur.
2. Sistem memvalidasi field wajib dan dokumen minimum.
3. Finance review melakukan pengecekan kelengkapan.
4. Approver menyetujui atau menolak request.
5. Request yang lolos ditandai siap diteruskan ke alur accounting existing.
6. Status, owner, dan audit trail tercatat dengan jelas.
### Skenario sekunder
*   request dikembalikan untuk revisi
*   dokumen gagal diunggah atau tidak valid
*   user tidak punya permission untuk aksi tertentu
*   status handoff tidak siap karena data belum lengkap
*   sync/handoff mengalami kegagalan operasional

* * *
## 5\. Requirement
### Functional requirement

| ID | Requirement | Prioritas | Catatan |
| ---| ---| ---| --- |
| FR1 | User dapat submit invoice approval, payment request, dan reimbursement melalui intake terstruktur | Must | Core MVP |
| FR2 | Sistem memvalidasi field wajib dan dokumen minimum sebelum submit | Must | Mengurangi rework |
| FR3 | Finance team dapat review, return for revision, approve, atau reject request sesuai role | Must | Control layer inti |
| FR4 | Sistem menampilkan status lifecycle request, owner, dan next action dengan jelas | Must | Mengurangi follow-up manual |
| FR5 | Sistem mencatat audit trail atas aksi dan keputusan penting | Must | Compliance minimum |
| FR6 | Sistem menerapkan role-based access dan segregation of duties dasar | Must | Security & control |
| FR7 | Sistem menandai handoff readiness ke alur accounting existing | Must | Coexistence-safe MVP |
| FR8 | Sistem menyediakan notification dasar untuk perubahan status penting | Should | Nilai operasional tinggi, tapi masih bisa staged |
| FR9 | Sistem mendukung payment-related integration dengan Midtrans dan 2C2P | Post-MVP | Foundation perlu disiapkan, delivery sesudah MVP |
| FR10 | Sistem mendukung tax-related workflow integration | Post-MVP | Butuh definisi compliance lebih detail |
| FR11 | Sistem menyediakan reconciliation workspace untuk mismatch dan exception | Post-MVP | Sesudah payment/accounting state stabil |
| FR12 | Sistem mengambil alih accounting record ownership secara bertahap | Post-MVP | Replacement path |
| FR13 | Sistem mendukung migrasi data existing secara terkendali | Must (strategy), Post-MVP (full execution) | Strategy wajib sekarang, execution bertahap |

### Non-functional requirement
*   role-based access dengan least privilege
*   auditability untuk aksi penting
*   performa form, detail, dan upload dokumen yang stabil
*   retry dan error handling untuk proses operasional penting
*   observability untuk handoff, sync, payment, dan migration
*   aksesibilitas dasar: label eksplisit, keyboard navigation, contrast minimum WCAG AA
*   desain web-first, mobile hanya untuk pertimbangan iterasi lanjut
### Business rule & validasi
*   request tidak boleh dikirim tanpa field wajib dan dokumen minimum
*   aksi approve/reject hanya tersedia untuk approver yang sah
*   return for revision dan reject wajib menyertakan alasan
*   user tanpa permission tidak boleh melihat atau mengeksekusi aksi sensitif
*   request hanya bisa ditandai ready for accounting handoff jika seluruh syarat minimum terpenuhi
*   tidak boleh ada domain yang aktif diedit bebas di Neralink dan Xero tanpa ownership rule yang jelas

* * *
## 6\. User Flow & Desain
### Flow level tinggi
1. User membuka queue atau entry point pembuatan request
2. User memilih jenis workflow: invoice approval, payment request, atau reimbursement
3. User mengisi form dan mengunggah dokumen
4. Sistem memvalidasi input dan membuat request
5. Finance melakukan review
6. Request diteruskan ke approver atau dikembalikan untuk revisi
7. Approver menyetujui atau menolak
8. Sistem memperbarui status, audit trail, dan handoff readiness
### Screen set MVP
*   Request List / Queue
*   Intake Form
*   Request Detail
*   Finance Review Screen
*   Approval Review Screen
*   Audit Trail Panel
*   Handoff Readiness Section
### State lengkap yang wajib ditangani
*   default
*   empty
*   loading
*   partial
*   error
*   success
*   no-permission
*   offline bila koneksi tidak stabil relevan
### Prinsip desain
*   satu primary action per layar
*   status, nominal, tanggal, owner, dan next action harus selalu jelas
*   auditability dan permission adalah bagian inti, bukan pelengkap
*   gunakan arsitektur layar bersama untuk tiga workflow awal agar build efisien dan konsisten
*   error message harus actionable dan non-teknis
### Alternatif yang ditolak
1. Satu form universal sangat panjang untuk semua workflow — ditolak karena menambah cognitive load dan error rate
2. Approval screen minimal tanpa konteks audit — ditolak karena tidak aman untuk compliance
3. Queue tunggal tanpa pemisahan role/status — ditolak karena menyulitkan triage

* * *
## 7\. Story Breakdown
### Epic 1 — Workflow Intake
*   submit invoice approval request
*   submit payment request
*   submit reimbursement request
### Epic 2 — Finance Review & Approval
*   finance review and return for revision
*   approve or reject request
### Epic 3 — Status, Notification & Audit Trail
*   view request status and next action
*   notify user on critical status changes
*   view audit trail timeline
### Epic 4 — Permission & Control Foundation
*   enforce role-based access
### Epic 5 — Xero Coexistence Foundation
*   mark request sync readiness for existing accounting flow
### Estimasi relatif awal

| Epic | Estimasi |
| ---| --- |
| Epic 1 — Workflow Intake | M |
| Epic 2 — Finance Review & Approval | M |
| Epic 3 — Status, Notification & Audit Trail | M |
| Epic 4 — Permission & Control Foundation | M |
| Epic 5 — Xero Coexistence Foundation | M-L |

* * *
## 8\. Analytics & Instrumentasi
### Core events
*   `request_form_viewed`
*   `request_submission_started`
*   `request_submission_failed`
*   `request_submitted`
*   `finance_review_started`
*   `request_returned_for_revision`
*   `approval_viewed`
*   `request_approved`
*   `request_rejected`
*   `audit_trail_viewed`
*   `handoff_readiness_checked`
*   `handoff_marked_ready`
*   `handoff_blocked`
### Event properties
*   `workflow_type`
*   `requester_role`
*   `approver_role`
*   `amount_bucket`
*   `currency`
*   `document_count`
*   `status`
*   `handoff_status`
*   `rejection_reason_category`

* * *
## 9\. Dependency, Risiko, Mitigasi

| Area | Risiko / Dependency | Mitigasi |
| ---| ---| --- |
| Xero coexistence | Dual system confusion dan ownership ambiguity | Source-of-truth matrix per domain |
| Compliance | Auditability dan segregation of duties kurang | Jadikan control foundation sebagai scope inti MVP |
| Migration | Scope migrasi melebar dan kualitas data rendah | Pisahkan migration strategy sekarang, execution bertahap sesudah MVP |
| Payment/tax integration | Komplexitas delivery membengkak bila dipaksa masuk MVP | Jadikan post-MVP dengan preparatory architecture di MVP |
| Reconciliation | Rule dan exception handling berat | Tunda sampai payment/accounting state lebih stabil |
| Scope overload | Semua domain dianggap wajib di release awal | Tegaskan batas MVP vs post-MVP di PRD v2 |

* * *
## 10\. Rollout
### Fase rilis yang direkomendasikan
**MVP / Release A**
*   invoice approval
*   payment request
*   reimbursement
*   finance review
*   approve/reject
*   document control
*   status tracking
*   audit trail
*   role-based access
*   handoff readiness ke alur accounting existing

**Post-MVP Phase 1**
*   Midtrans / 2C2P integration
*   tax workflow integration
*   notification hardening
*   exception handling yang lebih kaya
*   reconciliation workspace awal

**Post-MVP Phase 2**
*   accounting record ownership
*   active data migration
*   ledger/posting control
*   decommission path terhadap Xero
### Rollback criteria
*   financial error rate meningkat di atas ambang aman
*   compliance control minimum tidak terpenuhi
*   handoff failure menyebabkan gangguan operasional signifikan
*   request tidak dapat diproses end-to-end tanpa intervensi manual berlebihan
### Enablement needs
*   SOP baru untuk Finance/Admin/Approver
*   UAT berbasis kasus nyata
*   panduan fallback manual untuk handoff failure
*   alignment dengan Tech Lead, Finance Lead, dan Compliance/Controller

* * *
## 11\. Open Question & Riwayat Keputusan
### Keputusan yang sudah diambil
*   Target user pertama dan utama adalah Accounting dan Finance
*   Objective utama adalah cost reduction
*   Neralink akan bertahap menggantikan Xero
*   MVP harus production-ready, bukan prototype
*   MVP bukan full Xero replacement
### Open questions
1. Berapa target pengurangan biaya yang dianggap sukses dalam 6–12 bulan pertama?
2. Compliance control minimum apa yang absolut wajib ada di MVP?
3. Handoff ke Xero pada MVP akan manual, semi-otomatis, atau event-driven?
4. Existing data minimum apa yang wajib tersedia di Neralink pada MVP?
5. Jika kapasitas sprint terbatas, dari invoice approval, payment request, dan reimbursement mana yang dirilis paling awal?

* * *
## 12\. Rekomendasi Final
**Definisi final MVP Neralink:**
> MVP Neralink adalah minimum production-ready release yang mampu memberikan pengurangan biaya operasional nyata untuk tim Accounting & Finance melalui workflow intake, review, approval, document control, status tracking, audit trail, permission, dan coexistence yang aman dengan Xero.
**Penegasan penting:**
> Full replacement terhadap Xero adalah objective roadmap bertahap pasca-MVP, bukan syarat keberhasilan MVP itu sendiri.