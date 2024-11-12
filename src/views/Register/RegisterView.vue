<script setup lang="ts">
import { ref } from 'vue'
import type { FieldRule } from 'vant'
import { formToJson } from '@/utils/formToJson'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

// 定义响应式表单字段
const formData = ref({
  username: '',
  studentId: '',
  emailPrefix: '',
  verificationCode: '', // 添加邮箱验证码字段
  password: '',
  confirmPassword: ''
})

// 获取用户存储
const userStore = useUserStore()

// 使用 Vue Router
const router = useRouter()

// 验证规则
const formRules: Record<string, FieldRule[]> = {
  username: [
    { required: true, message: '真实姓名不能为空', trigger: 'onBlur' }
  ],
  studentId: [
    { required: true, message: '学号不能为空', trigger: 'onBlur' },
    {
      required: true,
      pattern: /^\d{10}$/,
      message: '学号必须为10位数字',
      trigger: 'onBlur'
    }
  ],
  emailPrefix: [{ required: true, message: '邮箱不能为空', trigger: 'onBlur' }],
  verificationCode: [
    { required: true, message: '验证码不能为空', trigger: 'onBlur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'onBlur' },
    {
      required: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '密码至少8位，且必须包含大小写字母和数字',
      trigger: 'onBlur'
    }
  ]
}

// 自定义密码确认验证
const validatePasswords = () => {
  if (!formData.value.confirmPassword) {
    showFailToast({
      message: '请确认密码',
      position: 'top',
      className: 'custom-fail-toast'
    })
    return false
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    showFailToast({
      message: '两次输入的密码不一致',
      position: 'top',
      className: 'custom-fail-toast'
    })
    return false
  }
  return true
}

// 控制验证码按钮状态
const isSendingCode = ref(false)
const countdown = ref(60)

const getVerificationCode = async () => {
  const fullEmail = `${formData.value.emailPrefix}@ctbu.edu.cn`
  const isEmail = /^[a-zA-Z0-9._%+-]+@ctbu\.edu\.cn$/.test(fullEmail)
  if (!isEmail) {
    showFailToast({
      message: '请输入有效的邮箱',
      position: 'top',
      className: 'custom-fail-toast'
    })
    return
  }

  isSendingCode.value = true
  countdown.value = 60

  try {
    const jsonData = formToJson({ email: fullEmail })
    await userStore.sendVerificationCode(jsonData)
    showSuccessToast({
      message: '验证码已发送',
      position: 'top',
      className: 'custom-normal-toast'
    })

    // 开始倒计时
    const interval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(interval)
        isSendingCode.value = false
      }
    }, 1000)
  } catch (error) {
    showFailToast({
      message: '发送验证码失败',
      position: 'top',
      className: 'custom-fail-toast'
    })
    isSendingCode.value = false
  }
}

// 注册提交逻辑
const onSubmitRegister = async () => {
  if (validatePasswords()) {
    const fullEmail = `${formData.value.emailPrefix}@ctbu.edu.cn`
    const isEmail = /^[a-zA-Z0-9._%+-]+@ctbu\.edu\.cn$/.test(fullEmail)
    if (!isEmail) {
      showFailToast({
        message: '请输入有效的邮箱',
        position: 'top',
        className: 'custom-fail-toast'
      })
      return
    }

    const reqData = {
      username: formData.value.username,
      student_id: formData.value.studentId,
      email: fullEmail,
      verificationCode: formData.value.verificationCode,
      password: formData.value.password
    }

    const jsonData = formToJson(reqData)
    try {
      await userStore.register(jsonData)
      showSuccessToast({
        message: '注册成功',
        position: 'top',
        className: 'custom-normal-toast'
      })
      router.push('/login')
    } catch (error: any) {
      showFailToast({
        message: error.response.data.message,
        position: 'top',
        className: 'custom-fail-toast'
      })
    }
  }
}
</script>

<template>
  <div class="register-container">
    <img src="@/assets/images/透明队徽.png" alt="团队徽标" class="team-logo" />
    <h1 class="title">注册新用户</h1>

    <van-form @submit="onSubmitRegister" class="form-background">
      <van-field
        v-model="formData.username"
        label="真实姓名"
        placeholder="请输入真实姓名（无法更改）"
        :rules="formRules.username"
        required
      />
      <van-field
        v-model="formData.studentId"
        label="学号"
        placeholder="请输入10位学号"
        :rules="formRules.studentId"
        required
      />
      <van-field
        v-model="formData.emailPrefix"
        label="邮箱"
        placeholder="请输入邮箱前缀"
        :rules="formRules.emailPrefix"
        required
        class="email_field"
      >
        <template #button>
          <van-button size="small" plain disabled class="mail_button"
            >@ctbu.edu.cn</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="formData.verificationCode"
        label="验证码"
        placeholder="请输入邮箱验证码"
        :rules="formRules.verificationCode"
        required
        class="verification_code_field"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            :disabled="isSendingCode"
            @click="getVerificationCode"
          >
            {{ isSendingCode ? `${countdown}秒` : '获取验证码' }}
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="formData.password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        :rules="formRules.password"
        required
      />
      <van-field
        v-model="formData.confirmPassword"
        label="确认密码"
        type="password"
        placeholder="请再次输入密码"
        required
      />
      <van-button round block type="primary" native-type="submit"
        >注册</van-button
      >
    </van-form>

    <p class="link-text">
      已有账号？<router-link to="/login" class="router_link"
        >去登录</router-link
      >
    </p>
  </div>
  <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
</template>

<style scoped>
.register-container {
  padding: 20px 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
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

.mail_field,
.verification_code_field {
  position: relative;
}

.mail_button,
.verification_button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
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
