import { defineComponent, toRefs, h, ref, onMounted, onUnmounted } from '@vue/runtime-core'
import plane from '../../assets/plane.png'

export default defineComponent({
    props: ['x', 'y'],
    setup(props, { emit }) {
        const { x, y } = toRefs(props)
        const handleAttack = (e) => {
            if (e.code === 'Space') {
                emit('attack', {
                    x: x.value + 100,
                    y: y.value
                })
            }
        }
        onMounted(() => {
            window.addEventListener('keydown', handleAttack)
        })

        onUnmounted(() => {
            window.removeEventListener('keydown', handleAttack)
        })

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