import Button from './Button'

function PageHeader({ title, subtitle, onExport, onCreate }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold leading-8 text-[#181d27]">{title}</p>
        <p className="text-sm leading-5 text-[#535862]">{subtitle}</p>
      </div>
      <div className="flex items-start gap-3">
        <Button variant="secondary" onClick={onExport}>
          Ekspor
        </Button>
        <Button variant="primary" onClick={onCreate}>
          Transaksi baru
        </Button>
      </div>
    </div>
  )
}

export default PageHeader
