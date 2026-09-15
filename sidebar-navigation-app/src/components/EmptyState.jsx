function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-16 text-center">
      <p className="text-sm font-semibold text-[#181d27]">{title}</p>
      {description && <p className="max-w-sm text-sm text-[#535862]">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export default EmptyState
