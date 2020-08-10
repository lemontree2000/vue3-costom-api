import { defineComponent, toRefs, h, ref } from '@vue/runtime-core'
import enemyImg from '../../assets/enemy.png'

export default defineComponent({
    props: ['x', 'y'],
    setup(props, ctx) {
        const { x, y } = toRefs(props)
        console.log('enemy')
        return {
            x,
            y
        }
    },
    render(ctx) {
        return h("Container", [
            h("Sprite", {
                texture: enemyImg,
                x: ctx.x,
                y: ctx.y
            })
        ])
    }
})