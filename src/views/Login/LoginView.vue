<script setup lang="ts">
import type { FieldRule, FieldRuleValidator } from 'vant' // 引入 FieldRule 和 FieldRuleValidator 类型

// 登录表单数据
const loginCredential = ref('') // 学号或邮箱
const password = ref('') // 密码

// 表单验证规则
const validateLoginCredential: FieldRuleValidator = (_, value) => {
  // 学号必须为10位数字，或邮箱必须符合@ctbu.edu.cn格式
  const isStudentId = /^\d{10}$/.test(value as string)
  const isEmail = /^[a-zA-Z0-9._%+-]+@ctbu\.edu\.cn$/.test(value as string)
  return isStudentId || isEmail
}

// 表单规则类型定义
const formRules: Record<string, FieldRule[]> = {
  loginCredential: [
    { required: true, message: '学号或邮箱不能为空', trigger: 'onBlur' },
    {
      validator: validateLoginCredential,
      message: '请输入有效的学号或邮箱',
      trigger: 'onBlur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'onBlur' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '密码至少8位，且必须包含大小写字母和数字',
      trigger: 'onBlur'
    }
  ]
}

// 登录提交逻辑
const onSubmitLogin = () => {
  if (!loginCredential.value || !password.value) {
    showFailToast({ message: '学号/邮箱和密码不能为空', position: 'top' })
    return
  }

  // 校验输入的是否为有效的学号或邮箱格式
  const isStudentId = /^\d{10}$/.test(loginCredential.value)
  const isEmail = /^[a-zA-Z0-9._%+-]+@ctbu\.edu\.cn$/.test(
    loginCredential.value
  )
  if (!isStudentId && !isEmail) {
    showFailToast({ message: '请输入有效的学号或邮箱', position: 'top' })
    return
  }

  console.log('学号/邮箱:', loginCredential.value, '密码:', password.value)
  showSuccessToast('登录成功')
  // 处理登录成功后的逻辑，比如跳转到主页
}
</script>

<template>
  <div class="login-container">
    <img src="@/assets/images/透明队徽.png" alt="团队徽标" class="team-logo" />
    <h1 class="title">欢迎您的使用</h1>

    <van-form @submit="onSubmitLogin" class="form-background">
      <!-- 学号或邮箱输入框 -->
      <van-field
        v-model="loginCredential"
        label="学号/邮箱"
        placeholder="请输入学号或邮箱"
        :rules="formRules.loginCredential"
        required
      />
      <!-- 密码输入框 -->
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        :rules="formRules.password"
        required
      />
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </van-form>

    <p class="link-text">
      没有账号？<router-link to="/register" class="router_link"
        >去注册</router-link
      >
    </p>
  </div>
</template>

<style scoped>
.login-container {
  padding: 20px 20px;
  max-width: 400px;
  margin: 0px auto;
  background-color: hsl(0, 0%, 100%);
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.team-logo {
  display: block;
  margin: 0 auto;
  width: 100px;
}

.van-field {
  border-bottom: dashed 1px rgba(0, 0, 0, 0.2);
  margin: 0px 0px 10px 0;
}

.van-button {
  margin: 20px 0 10px 0;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.link-text {
  text-align: center;
  margin-top: 10px;
}

.router_link {
  color: #1989fa;
}
</style>
