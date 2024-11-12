<script setup lang="ts">
import type { FieldRule, FieldRuleValidator } from 'vant'
import { formToJson } from '@/utils/formToJson'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const loginInput = ref('') // 学号或邮箱
const password = ref('') // 密码

// 获取用户存储
const userStore = useUserStore()

// 使用 Vue Router
const router = useRouter()

// 表单验证规则
const validateloginInput: FieldRuleValidator = () => {
  const inputValue = loginInput.value

  if (!inputValue) return false // 输入为空时返回 false

  // 学号必须为10位数字，或邮箱必须符合 @ctbu.edu.cn 格式
  const isStudentId = /^\d{10}$/.test(inputValue)
  const isEmail = /^[a-zA-Z0-9._%+-]+@ctbu\.edu\.cn$/.test(inputValue)

  return isStudentId || isEmail // 返回验证结果
}

// 表单规则类型定义
const formRules: Record<string, FieldRule[]> = {
  loginInput: [
    { required: true, message: '学号或邮箱不能为空', trigger: 'onBlur' },
    {
      validator: validateloginInput,
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
const onSubmitLogin = async () => {
  if (!loginInput.value || !password.value) {
    showFailToast({
      message: '学号/邮箱和密码不能为空',
      position: 'top',
      className: 'custom-fail-toast'
    })
    return
  }

  const isStudentId = /^\d{10}$/.test(loginInput.value)
  const isEmail = /^[a-zA-Z0-9._%+-]+@ctbu\.edu\.cn$/.test(loginInput.value)
  if (!isStudentId && !isEmail) {
    showFailToast({
      message: '请输入有效的学号或邮箱',
      position: 'top',
      className: 'custom-fail-toast'
    })
    return
  }

  // 转换表单数据为JSON格式
  const formData = {
    loginInput: loginInput.value,
    password: password.value
  }

  const jsonData = formToJson(formData) // 调用转换函数

  try {
    // 调用 Pinia 存储的 login 方法
    await userStore.login(jsonData)
    showSuccessToast({
      message: '登录成功',
      position: 'top',
      className: 'custom-normal-toast'
    })
    router.push('/')
  } catch (error) {
    showFailToast({
      message: '登录失败，请重试',
      position: 'top',
      className: 'custom-fail-toast'
    })
  }
}

onMounted(() => {
  if (userStore.userInfo.studentId) {
    loginInput.value = userStore.userInfo.studentId
  }
})
</script>

<template>
  <div class="login-container">
    <img src="@/assets/images/透明队徽.png" alt="团队徽标" class="team-logo" />
    <h1 class="title">欢迎您的使用</h1>

    <van-form @submit="onSubmitLogin" class="form-background">
      <!-- 学号或邮箱输入框 -->
      <van-field
        v-model="loginInput"
        label="学号/邮箱"
        placeholder="请输入学号或邮箱"
        :rules="formRules.loginInput"
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
  <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
</template>

<style scoped>
.login-container {
  padding: 20px 20px;
  max-width: 400px;
  margin: 0px auto;
  background-color: hsl(0, 0%, 100%);
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease;
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

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
