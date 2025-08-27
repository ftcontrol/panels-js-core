import { getGlobalData, setGlobalData } from "../globalWriter"

type Entry = {
  id: string
  close: () => void
}

export function addEntry(id: string, close: () => void) {
  var history = getGlobalData<Entry[]>("overlays")
  if (history == undefined) {
    history = []
  }

  history.push({
    id,
    close,
  })

  setGlobalData("overlays", history)

  return history.length - 1
}

export function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function closeAllAfter(id: string) {
  let history = getGlobalData<Entry[]>("overlays")
  if (!history) return
  if (history.length == 0) return

  if (history.length == 1) {
    history[0]?.close()
    history = []
    setGlobalData("overlays", history)
    return
  }

  const index = history.findIndex((e) => e.id === id)
  if (index === -1) return

  for (let i = index; i < history.length; i++) {
    history[i]?.close()
  }

  history = history.slice(0, index)

  setGlobalData("overlays", history)
}

export function closeLast(id: string) {
  let history = getGlobalData<Entry[]>("overlays")
  if (!history || history.length === 0) return

  const lastEntry = history[history.length - 1]
  if (lastEntry == undefined) return
  if (lastEntry.id === id) {
    lastEntry.close()
    history.pop()
    setGlobalData("overlays", history)
  }
}
