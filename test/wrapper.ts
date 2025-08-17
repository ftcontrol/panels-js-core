import Main from "./Main.svelte"
import { mount } from "svelte"

export default function load(target: HTMLElement, props: any) {
  return mount(Main, {
    target: target,
    props: props,
  })
}
