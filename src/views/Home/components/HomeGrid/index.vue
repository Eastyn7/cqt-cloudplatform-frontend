<template>
  <van-grid icon-size="30px" :column-num="2" clickable>
    <van-grid-item
      text="校园服务通"
      icon=" icon-campus-service"
      icon-prefix="iconfont"
      to="/campusservice"
    />
    <van-grid-item
      text="爱心雨伞"
      icon=" icon-love-umbrella"
      icon-prefix="iconfont"
      to="/loveumbrella"
    />
    <van-grid-item
      text="服务队活动风采"
      icon=" icon-great-activities"
      icon-prefix="iconfont"
      to="/activities"
    />
    <van-grid-item
      text="志愿活动报名"
      icon=" icon-signup-activities"
      icon-prefix="iconfont"
      to="/signup"
    />
    <van-grid-item
      text="关于青队"
      icon=" icon-about-us"
      icon-prefix="iconfont"
      to="/aboutus"
    />
    <van-grid-item
      text="用户意见反馈"
      icon=" icon-feedback"
      icon-prefix="iconfont"
      to="/feedback"
    />
  </van-grid>
</template>

<script setup lang="ts"></script>

<style scoped></style>
