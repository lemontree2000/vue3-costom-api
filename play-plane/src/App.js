import { defineComponent, h, ref, computed } from '@vue/runtime-core'
import StartPage from './page/StartPage'
import GamePage from './page/GamePage'
import EndPage from './page/EndPage'

export default defineComponent({
    setup() {
        const currentPageName = ref('StartPage')
        const currentPage = computed(() => {
            if (currentPageName.value === 'StartPage') {
                return StartPage
            } else if (currentPageName.value === 'GamePage') {
                return GamePage
            } else if (currentPageName.value === 'EndPage') {
                return EndPage
            }
        })
        return {
            currentPage,
            currentPageName
        }
    },
    render(context) {
        console.log(context.currentPage)
        return h("Container", [
            h(context.currentPage, {
                onChangePage(page) {
                    context.currentPageName = page
                }
            })
        ])
    }
})