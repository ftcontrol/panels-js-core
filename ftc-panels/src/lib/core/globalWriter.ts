const GLOBAL_NAMESPACE = "__PANELS__"

type WindowWithAppData = Window & {
  [GLOBAL_NAMESPACE]?: Record<string, unknown>
}

function getStorage(): Record<string, unknown> | undefined {
  return (window as WindowWithAppData)[GLOBAL_NAMESPACE]
}

function ensureStorage(): Record<string, unknown> {
  const w = window as WindowWithAppData
  if (!w[GLOBAL_NAMESPACE]) {
    w[GLOBAL_NAMESPACE] = {}
  }
  return w[GLOBAL_NAMESPACE]!
}

export function setGlobalData<T>(key: string, value: T): void {
  const storage = ensureStorage()
  storage[key] = value
}

export function getGlobalData<T = unknown>(key: string): T | undefined {
  return getStorage()?.[key] as T | undefined
}

export function deleteGlobalData(key: string): void {
  const storage = getStorage()
  if (storage) {
    delete storage[key]
  }
}
