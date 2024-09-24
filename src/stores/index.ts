import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

import { useCounterStore } from './counter'

export default pinia

export const useStore = () => {
  return {
    counter: useCounterStore()
  }
}
