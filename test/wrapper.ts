import Main from "./Main.svelte"
import Main2 from "./Main2.svelte"
import Main3 from "./Main3.svelte"
import Main4 from "./Main4.svelte"
import { mount } from "svelte"

export default class Selector {
  mappings = [Main, Main2, Main3, Main4]

  load(index: number, target: HTMLElement, props: any) {
    return mount(this.mappings[index], {
      target: target,
      props: props,
    })
  }

  loadDocs() {
    console.log("Test")
  }
}
