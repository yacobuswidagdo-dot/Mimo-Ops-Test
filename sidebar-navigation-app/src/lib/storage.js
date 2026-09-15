import { useEffect, useState } from 'react'

// Per-viewer convenience only (per-browser persistence for this prototype demo).
// Falls back to in-memory state if storage is unavailable (private mode, etc).
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write failures (private mode, quota, etc.)
    }
  }, [key, value])

  return [value, setValue]
}
