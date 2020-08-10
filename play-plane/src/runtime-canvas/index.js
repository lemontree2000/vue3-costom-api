import { createRenderer } from "@vue/runtime-core"
import { Text, Container, Sprite, Texture } from 'pixi.js'
const renderer = createRenderer({
    createElement(type) {
        let element;
        switch (type) {
            case "Container":
                element = new Container()
                break;
            case "Sprite":
                element = new Sprite()
                break;
        }
        return element
    },
    insert(el, parent) {
        parent.addChild(el)
    },
    patchProp(el, key, prevValue, nextValue) {
        switch (key) {
            case "texture":
                el.texture = Texture.from(nextValue)
                break;
            case "onClick":
                el.on('pointertap', nextValue)
            default:
                el[key] = nextValue
        }
    },
    setElementText(node, text) {
        const cText = new Text(text)
        node.addChild(cText)
    },
    createText(text) {
        return new Text(text)
    },
    parentNode() {

    },
    nextSibling() {

    },
    remove() {

    }
})


export function createApp(rootComponet) {
    return renderer.createApp(rootComponet)
}