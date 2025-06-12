import Component from "./Greeting.svelte"

export default function mount(target, props) {
  return new Component({
    target,
    props,
  })
}
