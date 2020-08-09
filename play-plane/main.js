import { createApp } from './src/runtime-canvas'
import App from './src/App'
import { getRootContainer } from "./src/Game";
// 根组件


createApp(App).mount(getRootContainer())