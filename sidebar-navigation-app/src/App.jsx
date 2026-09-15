import SidebarNavigation from './components/SidebarNavigation'

function App() {
  return (
    <div className="flex h-screen">
      <div className="w-[216px]">
        <SidebarNavigation />
      </div>
      <div className="flex-1 bg-[#fafafa]" />
    </div>
  )
}

export default App
