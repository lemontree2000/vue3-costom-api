import { defineComponent, h, reactive } from '@vue/runtime-core'
import Map from '../components/Map'
import Plane from '../components/Plane'

export default defineComponent({
    setup() {
        const { planeInfo } = usePlaneInfo()
        return {
            planeInfo
        }
    },
    render(ctx) {
        return h("Container", [
            h(Map),
            h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y })
        ])
    }
})

function usePlaneInfo() {
    const planeInfo = reactive({ x: 120, y: 150 })
    const speed = 15

    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowUp":
                planeInfo.y -= speed
                break
            case "ArrowDown":
                planeInfo.y += speed
                break
            case "ArrowLeft":
                planeInfo.x -= speed
                break

            case "ArrowRight":
                planeInfo.x += speed
                break
        }
    })
    return { planeInfo }
}
