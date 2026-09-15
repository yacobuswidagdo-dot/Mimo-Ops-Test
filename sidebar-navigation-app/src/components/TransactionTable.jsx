import { useState } from 'react'
import Badge from './Badge'
import { AlertTriangleIcon, ArrowLeftIcon, ArrowRightIcon, ChevronSelectorVerticalIcon } from './icons'
import Button from './Button'

const COLUMNS = [
  { key: 'id', label: 'ID · partner', width: 'flex-1' },
  { key: 'nominal', label: 'Nominal', width: 'w-[130px]' },
  { key: 'status', label: 'Status operasional', width: 'w-[150px]' },
  { key: 'owner', label: 'Owner', width: 'w-[130px]' },
  { key: 'aging', label: 'Aging', width: 'w-[105px]' },
  { key: 'action', label: 'Next action', width: 'w-[265px]', sortable: false },
  { key: 'readiness', label: 'Readiness', width: 'w-[150px]' },
]

function HeaderCell({ column }) {
  return (
    <div className={`flex items-center px-4 py-2.5 ${column.width}`}>
      <div className="flex items-center gap-1">
        <p className="text-xs font-semibold whitespace-nowrap text-[#717680]">{column.label}</p>
        {column.sortable !== false && <ChevronSelectorVerticalIcon className="size-3 text-[#717680]" />}
      </div>
    </div>
  )
}

function TransactionRow({ row }) {
  return (
    <div className="flex w-full items-start border-b border-[#e9eaeb]">
      <div className="w-[3px] self-stretch shrink-0" style={{ background: row.marker || 'transparent' }} />
      <div className="flex h-[72px] flex-1 items-center p-4">
        <div className="flex flex-col text-sm leading-5 whitespace-nowrap">
          <p className="font-medium text-[#181d27]">{row.id}</p>
          <p className="text-[#535862]">{row.partner}</p>
        </div>
      </div>
      <div className="flex h-[72px] w-[130px] items-center p-4">
        {row.nominalSub ? (
          <div className="flex w-full flex-col text-sm leading-5">
            <p className="w-full text-right font-medium text-[#181d27]">{row.nominal}</p>
            <p className="w-full text-right text-[#535862]">{row.nominalSub}</p>
          </div>
        ) : (
          <p className="w-full text-right text-sm leading-5 text-[#535862]">{row.nominal}</p>
        )}
      </div>
      <div className="flex h-[72px] w-[150px] items-center p-4">
        <Badge tone={row.status.tone}>{row.status.label}</Badge>
      </div>
      <div className="flex h-[72px] w-[130px] items-center p-4">
        <div className="flex flex-col text-sm leading-5 whitespace-nowrap">
          <p className="font-medium text-[#181d27]">{row.owner}</p>
          {row.ownerPerson && <p className="text-[#535862]">{row.ownerPerson}</p>}
        </div>
      </div>
      <div className="flex h-[72px] w-[105px] items-center p-4">
        <div className="flex w-full flex-col text-right text-sm leading-5">
          <p className="w-full font-medium text-[#181d27]">{row.aging}</p>
          {row.agingSub && <p className="w-full text-[#535862]">{row.agingSub}</p>}
        </div>
      </div>
      <div className="flex h-[72px] w-[265px] items-center p-4">
        <div className="flex flex-col text-sm leading-5 whitespace-nowrap">
          <p className="font-medium text-[#181d27]">{row.action}</p>
          <p className="text-[#535862]">{row.actionSub}</p>
        </div>
      </div>
      <div className="flex h-[72px] w-[150px] items-center p-4">
        <Badge tone={row.readiness.tone} pill={false}>
          {row.readiness.label}
        </Badge>
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onChange }) {
  const pageNumbers = [1, 2, 3, null, totalPages - 2, totalPages - 1, totalPages]

  return (
    <div className="flex w-full items-center justify-center gap-3 border-t border-[#e9eaeb] px-6 pt-3 pb-4">
      <div className="flex flex-1 items-center">
        <Button variant="secondary" onClick={() => onChange(Math.max(1, page - 1))}>
          <ArrowLeftIcon className="size-5" />
          Previous
        </Button>
      </div>
      <div className="flex items-start gap-0.5">
        {pageNumbers.map((n, i) =>
          n === null ? (
            <div key={`ellipsis-${i}`} className="flex size-10 items-center justify-center rounded-lg text-sm font-medium text-[#535862]">
              …
            </div>
          ) : (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`flex size-10 items-center justify-center rounded-lg text-sm font-medium ${
                n === page ? 'bg-[#fafafa] text-[#252b37]' : 'text-[#535862]'
              }`}
            >
              {n}
            </button>
          ),
        )}
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Button variant="secondary" onClick={() => onChange(Math.min(totalPages, page + 1))}>
          Next
          <ArrowRightIcon className="size-5" />
        </Button>
      </div>
    </div>
  )
}

function TransactionTable({ rows, totalPages = 10 }) {
  const [page, setPage] = useState(1)

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#e9eaeb] bg-white shadow-sm">
      <div className="flex w-full items-center gap-2.5 border-b border-[#fec84b] bg-[#fffaeb] px-5 py-2.5">
        <AlertTriangleIcon className="size-4 text-[#b54708]" />
        <p className="text-sm font-medium text-[#b54708]">
          Status pembayaran untuk 4 transaksi belum sinkron. Kolom terkait ditandai —.
        </p>
      </div>

      <div className="flex w-full items-start border-b border-[#e9eaeb] bg-[#fafafa]">
        <div className="w-[3px] shrink-0" />
        <div className="flex flex-1 items-start px-4 py-1.5">
          <p className="text-xs font-medium whitespace-nowrap text-[#717680]">TRANSAKSI</p>
        </div>
        <div className="flex w-[650px] items-start border-l border-[#e9eaeb] px-4 py-1.5">
          <p className="text-xs font-medium whitespace-nowrap text-[#717680]">ALUR KERJA</p>
        </div>
        <div className="flex w-[150px] items-start border-l border-[#e9eaeb] px-4 py-1.5">
          <p className="text-xs font-medium whitespace-nowrap text-[#717680]">PELAPORAN</p>
        </div>
      </div>

      <div className="flex w-full items-start border-b border-[#e9eaeb] bg-[#fafafa]">
        <div className="w-[3px] shrink-0" />
        {COLUMNS.map((column) => (
          <HeaderCell key={column.key} column={column} />
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-16 text-sm text-[#535862]">
          Tidak ada transaksi yang cocok.
        </div>
      ) : (
        rows.map((row) => <TransactionRow key={row.id} row={row} />)
      )}

      <div className="min-h-px w-full flex-1" />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}

export default TransactionTable
