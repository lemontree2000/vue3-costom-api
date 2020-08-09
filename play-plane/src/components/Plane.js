import { defineComponent, toRefs, h, ref } from '@vue/runtime-core'
import plane from '../../assets/plane.png'

export default defineComponent({
    props: ['x', 'y'],
    setup(props, ctx) {
        const { x, y } = toRefs(props)
        console.log(x)
        return {
            x,
            y
        }
    },
    render(ctx) {
        console.log(ctx.x)
        return h("Container", [
            h("Sprite", {
                texture: plane,
                x: ctx.x,
                y: ctx.y
            })
        ])
    }
})