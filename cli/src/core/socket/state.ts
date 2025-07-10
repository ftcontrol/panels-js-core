export type Callback = (newValue: any) => void

interface PluginValue {
  value: any
  callbacks: Callback[]
}

export class PluginStateManager {
  id: string
  globalState: StateManager
  constructor(id: string, globalState: StateManager) {
    this.id = id
    this.globalState = globalState
  }

  update(key: string, newValue: any) {
    this.globalState.updatePluginValue(this.id, key, newValue)
  }

  get(key: string) {
    return this.globalState.getPluginValue(this.id, key)
  }

  onChange(key: string, callback: Callback) {
    this.globalState.onChange(this.id, key, callback)
  }
}

export class StateManager {
  private data: Record<string, Record<string, PluginValue>> = {}

  private ensureExists(id: string, key: string): PluginValue {
    if (!this.data[id]) {
      this.data[id] = {}
    }

    if (!this.data[id][key]) {
      this.data[id][key] = {
        value: null,
        callbacks: [],
      }
    }

    return this.data[id][key]
  }

  updatePluginValue(id: string, key: string, newValue: any) {
    const entry = this.ensureExists(id, key)
    entry.value = newValue
    console.log(`Plugin ${id} changed ${key} to ${newValue}`)
    entry.callbacks.forEach((callback) => callback(newValue))
  }

  getPluginValue(id: string, key: string) {
    const entry = this.ensureExists(id, key)
    return entry.value
  }

  onChange(id: string, key: string, callback: Callback) {
    const entry = this.ensureExists(id, key)
    entry.callbacks.push(callback)
    if (entry.value == null) return
    callback(entry.value)
  }
}
