
const KEY = 'recruitright:v1'

export function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function save(patch) {
  const current = load()
  const next = { ...current, ...patch }
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function reset() {
  localStorage.removeItem(KEY)
}
