function NoPermission({ message = 'Peran Anda saat ini tidak memiliki akses untuk aksi ini.' }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#e9eaeb] bg-[#fafafa] px-4 py-3 text-sm text-[#535862]">
      <span className="font-medium text-[#414651]">Tidak ada akses.</span>
      {message}
    </div>
  )
}

export default NoPermission
