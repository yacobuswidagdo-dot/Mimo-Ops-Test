import { useApp } from '../context/AppContext'
import { ROLES, roleLabel } from '../lib/permissions'

function TopBar() {
  const { role, setRole, isOnline } = useApp()

  return (
    <div className="flex w-full flex-col">
      {!isOnline && (
        <div className="w-full bg-[#fef3f2] px-6 py-2 text-center text-sm font-medium text-[#b42318]">
          Anda sedang offline. Perubahan akan tersimpan secara lokal sampai koneksi kembali.
        </div>
      )}
      <div className="flex w-full items-center justify-end gap-2 border-b border-[#e9eaeb] bg-white px-6 py-2.5">
        <label className="text-sm text-[#535862]" htmlFor="role-switcher">
          Lihat sebagai peran (demo):
        </label>
        <select
          id="role-switcher"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-[#d5d7da] px-3 py-1.5 text-sm font-medium text-[#414651] focus:outline-none"
        >
          {ROLES.map((r) => (
            <option key={r.key} value={r.key}>
              {roleLabel(r.key)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TopBar
