import { generateId } from "../ui/overlay"

export type Notification = {
  id: string
  timestamp: number
  text: string
  executedAction: boolean
  actions: NotificationAction[]
}
export type NotificationAction = {
  text: string
  task: () => void
}

export type NotificationCallback = (newValue: Notification[]) => void

export class NotificationsManager {
  data: Notification[] = []

  callbacks: NotificationCallback[] = []

  onUpdate(c: NotificationCallback) {
    this.callbacks.push(c)
  }

  private sendUpdate() {
    for (const c of this.callbacks) {
      c(this.data)
    }
  }

  add(text: string) {
    this.data.push({
      id: generateId(),
      timestamp: Date.now(),
      text,
      executedAction: false,
      actions: [],
    })

    this.sendUpdate()
  }

  addAction(text: string, actions: NotificationAction[]) {
    const id = generateId()
    this.data.push({
      id: id,
      timestamp: Date.now(),
      text,
      executedAction: false,
      actions: actions.map((it) => {
        return {
          text: it.text,
          task: () => {
            it.task()
            for (const n of this.data) {
              if (n.id == id) {
                n.executedAction = true
                this.sendUpdate()
              }
            }
          },
        }
      }),
    })
    this.sendUpdate()
  }
}
