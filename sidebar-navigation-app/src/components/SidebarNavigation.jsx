import { NavLink } from 'react-router-dom'

// Only "Requests" is implemented in this prototype (PRD MVP scope). The rest
// of the shell items are kept for the sidebar's original Figma layout but are
// inert placeholders — clicking them does nothing.
const NAV_ITEMS = [
  { label: 'Overview', to: null },
  { label: 'Requests', to: '/requests' },
  { label: 'Approvals', to: null },
  { label: 'Billing & Payments', to: null },
  { label: 'Reporting Readiness', to: null },
  { label: 'Reports', to: null },
  { label: 'Settings', to: null },
]

function SidebarNavigation({ items = NAV_ITEMS }) {
  return (
    <div className="flex size-full flex-col items-start gap-0.5 border-r border-solid border-[#e9eaeb] bg-white px-4 py-6">
      <p className="font-['Inter'] text-base font-semibold leading-6 text-[#181d27]">Neralink</p>
      <div className="h-6 w-full shrink-0" />
      <nav className="flex w-full flex-col items-start gap-0.5">
        {items.map((item) =>
          item.to ? (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `w-full shrink-0 rounded-md px-3 py-2 text-left text-sm leading-5 ${
                  isActive ? 'bg-[#fafafa] font-semibold text-[#181d27]' : 'font-medium text-[#414651]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ) : (
            <span
              key={item.label}
              title="Belum tersedia di prototipe ini"
              className="w-full shrink-0 cursor-not-allowed rounded-md px-3 py-2 text-left text-sm leading-5 font-medium text-[#a4a7ae]"
            >
              {item.label}
            </span>
          ),
        )}
      </nav>
    </div>
  )
}

export default SidebarNavigation
