function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold leading-8 text-[#181d27]">{title}</p>
        <p className="text-sm leading-5 text-[#535862]">{subtitle}</p>
      </div>
      {actions && <div className="flex items-start gap-3">{actions}</div>}
    </div>
  )
}

export default PageHeader
