import { useMemo, useState } from 'react'
import SidebarNavigation from './components/SidebarNavigation'
import PageHeader from './components/PageHeader'
import AttentionTabs from './components/AttentionTabs'
import SearchAndFilters from './components/SearchAndFilters'
import TransactionTable from './components/TransactionTable'
import { ATTENTION_TABS, TRANSACTIONS } from './data/transactions'

function App() {
  const [activeTab, setActiveTab] = useState('mine')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return TRANSACTIONS
    return TRANSACTIONS.filter((row) =>
      [row.id, row.partner, row.nominal].some((field) => field.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <div className="w-[216px] shrink-0">
        <SidebarNavigation />
      </div>
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-7">
        <PageHeader title="Transactions" subtitle="312 transaksi · diperbarui 2 menit lalu" />
        <AttentionTabs tabs={ATTENTION_TABS} active={activeTab} onChange={setActiveTab} />
        <SearchAndFilters query={query} onQueryChange={setQuery} />
        <TransactionTable rows={rows} />
      </div>
    </div>
  )
}

export default App
