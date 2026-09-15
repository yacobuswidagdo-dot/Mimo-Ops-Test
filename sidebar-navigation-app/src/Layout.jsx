import { Outlet } from 'react-router-dom'
import SidebarNavigation from './components/SidebarNavigation'
import TopBar from './components/TopBar'
import ToastStack from './components/ToastStack'

function Layout() {
  return (
    <div className="flex h-screen bg-[#fafafa]">
      <div className="w-[216px] shrink-0">
        <SidebarNavigation />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-7">
          <Outlet />
        </div>
      </div>
      <ToastStack />
    </div>
  )
}

export default Layout
