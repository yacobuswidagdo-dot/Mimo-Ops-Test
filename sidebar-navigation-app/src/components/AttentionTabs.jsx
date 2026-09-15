import Badge from './Badge'

const BADGE_TONE = {
  gray: 'gray',
  red: 'red',
  amber: 'amber',
}

function AttentionTabs({ tabs, active, onChange }) {
  return (
    <div className="flex w-full items-center gap-1">
      {tabs.map((tab) => {
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex h-9 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold whitespace-nowrap ${
              isActive ? 'bg-white text-[#414651] shadow-sm' : 'text-[#717680]'
            }`}
          >
            {tab.label}
            <Badge tone={BADGE_TONE[tab.tone]}>{tab.count}</Badge>
          </button>
        )
      })}
    </div>
  )
}

export default AttentionTabs
