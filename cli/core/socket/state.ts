export type Callback = (newValue: any) => void
export type MutateCallback = (currentValue: any) => any

export interface PluginValue {
  value: any
  callbacks: Callback[]
}

export class PluginStateManager {
  data: Record<string, PluginValue> = {}

  id: string

  constructor(id: string) {
    this.id = id
    this.data = {}
  }

  private ensureExists(key: string): PluginValue {
    if (!this.data[key]) {
      this.data[key] = {
        value: null,
        callbacks: [],
      }
    }

    return this.data[key]
  }

  update(key: string, newValue: any) {
    const entry = this.ensureExists(key)
    entry.value = newValue
    console.log(`Plugin ${this.id} changed ${key} to ${newValue}`)
    entry.callbacks.forEach((callback) => callback(newValue))
  }

  get(key: string) {
    const entry = this.ensureExists(key)
    return entry.value
  }

  onChange(key: string, callback: Callback) {
    const entry = this.ensureExists(key)
    entry.callbacks.push(callback)
    if (entry.value == null) return
    callback(entry.value)
  }

  mutate(key: string, callback: MutateCallback) {
    const entry = this.ensureExists(key)
    const newValue = callback(entry.value)
    this.update(key, newValue)
  }
}
