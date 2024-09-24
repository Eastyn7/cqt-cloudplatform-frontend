<script setup>
import UserIsLoginView from '@/views/User/UserIsLogin/UserIsLoginView.vue'
import UserUnLoginView from '@/views/User/UserUnLogin/UserUnLoginView.vue'
// import{isLogin} from '@/utils/util'

let show = ref(false)

// onMounted(() => {
//   if (isLogin()) {
//     show.value = true
//   } else {
//     show.value = false
//   }
// })
</script>

<template>
  <div>
    <UserUnLoginView v-if="show" />
    <UserIsLoginView v-else />
    <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
  </div>
</template>

<style></style>
