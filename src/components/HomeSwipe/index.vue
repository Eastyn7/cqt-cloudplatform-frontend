<script setup lang="ts">
// 需要改成后端调用更新图片
const SwipeImages = reactive([
  {
    imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/duiqi.jpg',
    index: 0
  },
  {
    imgUrl:
      'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717068.jpeg',
    index: 1
  },
  {
    imgUrl:
      'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717071.jpeg',
    index: 2
  },
  {
    imgUrl:
      'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg',
    index: 3
  }
])
</script>

<template>
  <div class="swipe-container">
    <!-- 轮播图上层部分 -->
    <div class="foreground">
      <van-swipe
        loop
        class="my-swipe-fore"
        :autoplay="3000"
        indicator-color="#1989fa"
        :touchable="false"
      >
        <van-swipe-item v-for="item in SwipeImages" :key="item.index">
          <img :src="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 轮播图下层部分 -->
    <div class="background">
      <van-swipe loop class="my-swipe-back" :autoplay="3000" :touchable="false">
        <van-swipe-item v-for="item in SwipeImages" :key="item.index">
          <img :src="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style scoped>
.swipe-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 20px 20px 20px 20px;
}

.foreground {
  z-index: 1;
}

.my-swipe-fore {
  border-radius: 20px 20px 20px 20px;
  height: 210px;
  width: 330px;
  margin: 20px 0px 20px 0px;
  box-shadow: 2px 2px 20px #3b2e32;
  border: transparent;
}

.my-swipe-fore .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 20px 20px;
}

.background {
  z-index: 0;
  filter: blur(4px);
  opacity: 0.8;
  position: absolute;
}

.my-swipe-back {
  border-radius: 20px 20px 20px 20px;
  height: 240px;
  width: 365px;
}

.my-swipe-back .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 20px 20px;
}
</style>
