import { defineComponent, toRefs, h, ref } from '@vue/runtime-core'
import Bullet from '../../assets/bullet.png'

export default defineComponent({
    props: ['x', 'y'],
    setup(props, ctx) {
        const { x, y } = toRefs(props)
        return {
            x,
            y
        }
    },
    render(ctx) {
        return h("Container", [
            h("Sprite", {
                texture: Bullet,
                x: ctx.x,
                y: ctx.y
            })
        ])
    }
})