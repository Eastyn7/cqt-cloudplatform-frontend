<script setup lang="ts">
const activeName = ref<string>('1')
</script>

<template>
  <div>
    <van-nav-bar title="使用指南" fixed placeholder />
    <van-collapse v-model="activeName" accordion>
      <!-- 登录账户指南 -->
      <van-collapse-item
        title="步骤 1: 登录账户"
        name="1"
        :title-style="{ color: activeName === '1' ? '#1989fa' : '#000' }"
      >
        使用注册时的手机号或邮箱进行登录，未注册用户请先注册。登录后可以访问所有功能。
      </van-collapse-item>

      <!-- 查看通知指南 -->
      <van-collapse-item
        title="步骤 2: 查看通知"
        name="2"
        :title-style="{ color: activeName === '2' ? '#1989fa' : '#000' }"
      >
        登录后可以在通知页面查看最新的公告和通知，保持信息的及时获取。
      </van-collapse-item>

      <!-- 提交反馈指南 -->
      <van-collapse-item
        title="步骤 3: 提交反馈"
        name="3"
        :title-style="{ color: activeName === '3' ? '#1989fa' : '#000' }"
      >
        在反馈页面填写您的意见和建议，支持匿名提交，帮助我们改进服务。
      </van-collapse-item>

      <!-- 修改个人信息指南 -->
      <van-collapse-item
        title="步骤 4: 修改个人信息"
        name="4"
        :title-style="{ color: activeName === '4' ? '#1989fa' : '#000' }"
      >
        您可以在个人中心修改头像、昵称和联系方式等信息，以确保个人资料的准确性。
      </van-collapse-item>

      <!-- 常见问题指南 -->
      <van-collapse-item
        title="常见问题"
        name="5"
        :title-style="{ color: activeName === '5' ? '#1989fa' : '#000' }"
      >
        在常见问题页面，我们整理了一些常见的使用疑问及解答，供您参考。
      </van-collapse-item>

      <!-- 联系客服指南 -->
      <van-collapse-item
        title="联系客服"
        name="6"
        :title-style="{ color: activeName === '6' ? '#1989fa' : '#000' }"
      >
        如果遇到问题无法解决，您可以通过联系客服功能与我们取得联系。
      </van-collapse-item>
    </van-collapse>
    <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
  </div>
</template>

<style scoped></style>
