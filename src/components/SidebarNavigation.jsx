import { useState } from 'react'

const NAV_ITEMS = [
  'Overview',
  'Transactions',
  'Approvals',
  'Billing & Payments',
  'Reporting Readiness',
  'Reports',
  'Settings',
]

function SidebarNavigation({ items = NAV_ITEMS, defaultActive = 'Transactions' }) {
  const [active, setActive] = useState(defaultActive)

  return (
    <div className="flex size-full flex-col items-start gap-0.5 border-r border-solid border-[#e9eaeb] bg-white px-4 py-6">
      <p className="font-['Inter'] text-base font-semibold leading-6 text-[#181d27]">
        Neralink
      </p>
      <div className="h-6 w-full shrink-0" />
      <nav className="flex w-full flex-col items-start gap-0.5">
        {items.map((item) => {
          const isActive = item === active
          return (
            <button
              key={item}
              type="button"
              onClick={() => setActive(item)}
              className={`w-full shrink-0 rounded-md px-3 py-2 text-left text-sm leading-5 ${
                isActive
                  ? 'bg-[#fafafa] font-semibold text-[#181d27]'
                  : 'font-medium text-[#414651]'
              }`}
            >
              {item}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default SidebarNavigation
