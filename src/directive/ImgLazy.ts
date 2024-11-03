import { useIntersectionObserver } from '@vueuse/core'
interface ExtendedHTMLImageElement extends HTMLImageElement {
    default: string;
}
export const imgLazy = {
    mounted(el: ExtendedHTMLImageElement) {
        const cacheSrc = el.src;

        if (el.default) {
            el.src = el.default;
        } else {
            el.src = ''
        }
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                el.src = cacheSrc
                stop()
            }
        })
    }
}