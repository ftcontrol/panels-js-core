import { mount } from "svelte"
import Counter from "./Counter.svelte"

export default function load(target: HTMLElement, props) {
  return mount(Counter, {
    target: target,
    props: props,
  })
}
