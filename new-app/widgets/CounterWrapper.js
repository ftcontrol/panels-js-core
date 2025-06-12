import Component from "./Counter.svelte"

export default function mount(target, props) {
  return new Component({
    target,
    props,
  })
}
