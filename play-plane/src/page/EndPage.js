import { defineComponent, h } from '@vue/runtime-core'
import endPageImg from '../../assets/end_page.jpg'
import restartBtnImg from '../../assets/restartBtn.png'

export default defineComponent({
    setup(props, ctx) {
        const onClick = () => {
            ctx.emit('changePage', 'GamePage')
        }
        return {
            onClick
        }
    },
    render(context) {
        // 背景图片
        return h("Container", [
            h("Sprite", { texture: endPageImg }),
            h("Sprite", {
                texture: restartBtnImg,
                x: 225,
                y: 512,
                interactive: true,
                onClick: context.onClick
            })
        ])
    }
})