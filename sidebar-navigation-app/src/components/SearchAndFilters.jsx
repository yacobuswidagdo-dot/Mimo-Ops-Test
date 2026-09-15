import { SearchIcon, ChevronDownIcon } from './icons'
import Button from './Button'

function FilterButton({ variant = 'secondary', children }) {
  return (
    <Button variant={variant}>
      {children}
      <ChevronDownIcon className="size-5" />
    </Button>
  )
}

function SearchAndFilters({ query, onQueryChange }) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#d5d7da] bg-white px-3.5 py-2.5 shadow-xs">
        <SearchIcon className="size-5 text-[#717680]" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari ID transaksi, partner, atau nominal"
          className="w-full text-base text-[#181d27] placeholder:text-[#717680] focus:outline-none"
        />
      </div>
      <FilterButton>Status operasional</FilterButton>
      <FilterButton variant="secondary-active">Readiness · 2</FilterButton>
      <FilterButton>Owner</FilterButton>
      <FilterButton>Tipe</FilterButton>
      <FilterButton>Periode</FilterButton>
    </div>
  )
}

export default SearchAndFilters
