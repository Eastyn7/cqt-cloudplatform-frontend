import { imgLazy } from "./ImgLazy"
export default {
    install(app: { directive: (arg0: string, agr1: {}) => void }) {
        // 在此处注册全局指令，如：v-lazy
        app.directive('lazy', imgLazy)
    }
}