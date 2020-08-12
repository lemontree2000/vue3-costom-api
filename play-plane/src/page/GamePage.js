import { defineComponent, h, reactive, onMounted, onUnmounted } from '@vue/runtime-core'
import Map from '../components/Map'
import Plane from '../components/Plane'
import EnemyPlane from '../components/EnemyPlane'
import Bullet from '../components/Bullet'
import { game } from '../Game'
import { hitTestObject } from '../utils/index'

export default defineComponent({
    setup(props, ctx) {
        const { bullets } = useCreateBullets()

        const { planeInfo } = usePlaneInfo()
        const { enemyPlanes, addBullet } = useEnemyPlanes()

        const onAttack = (info) => {
            addBullet(info)
        }

        const handleTicker = () => {
            // 敌方飞机
            enemyPlanes.forEach((enemyInfo) => {
                enemyInfo.y++
            })
            enemyPlanes.forEach((enemyInfo) => {
                if (hitTestObject(enemyInfo, planeInfo)) {
                    ctx.emit('changePage', 'EndPage')
                }
            })

            bullets.forEach((bulletInfo) => {
                bulletInfo.y--
            })

            bullets.forEach((bulletInfo, bulletIndex) => {
                enemyPlanes.forEach((enemyInfo, enemyIndex) => {
                    if (hitTestObject(bulleInfo, enemyInfo)) {
                        bullets.splice(bulletIndex, 1)
                        enemyPlanes.splice(enemyIndex, 1)
                    }
                })
            })
        }

        onMounted(() => {
            game.ticker.add(handleTicker)
        })
        onUnmounted(() => {
            game.ticker.remove(handleTicker)
        })
        return {
            planeInfo,
            enemyPlanes,
            bullets,
            onAttack
        }
    },
    render(ctx) {
        const createEnemyPlanes = () => {
            return ctx.enemyPlanes.map((info) => {
                return h(EnemyPlane, { x: info.x, y: info.y })
            })
        }
        const createBullets = () => {
            return ctx.bullets.map((info) => {
                return h(Bullet, { x: info.x, y: info.y })
            })
        }
        return h("Container", [
            h(Map),
            h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack }),
            ...createEnemyPlanes(),
            ...createBullets()
        ])
    }
})



function useCreateBullets() {
    const bullets = reactive([])

    const addBullet = (info) => {
        bullets.push(info)
    }

    return {
        bullets,
        addBullet
    }
}

function useEnemyPlanes() {
    const enemyPlanes = reactive([
        {
            x: 0,
            y: 0,
            width: 308,
            height: 207
        }
    ])
    game.ticker.add(() => {
        enemyPlanes.forEach((info) => {
            info.y++
        })
    })
    return { enemyPlanes }
}

function usePlaneInfo() {
    const planeInfo = reactive({ x: 120, y: 550, width: 258, height: 364 })
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
