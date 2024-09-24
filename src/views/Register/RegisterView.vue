<script setup lang="ts">
const studentId = ref('')
const emailPrefix = ref('') // 只输入邮箱前缀
const password = ref('')
const confirmPassword = ref('')

// 验证规则
const formRules = {
  studentId: [
    { required: true, message: '学号不能为空', trigger: 'onBlur' },
    { pattern: /^\d{10}$/, message: '学号必须为10位数字', trigger: 'onBlur' }
  ],
  emailPrefix: [{ required: true, message: '邮箱不能为空', trigger: 'onBlur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'onBlur' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: '密码至少8位，且必须包含大小写字母和数字',
      trigger: 'onBlur'
    }
  ]
}

// 自定义密码确认验证
const validatePasswords = () => {
  if (!confirmPassword.value) {
    showFailToast({ message: '请确认密码', position: 'top' })
    return false
  }
  if (password.value !== confirmPassword.value) {
    showFailToast({
      message: '两次输入的密码不一致',
      position: 'top'
    })
    return false
  }
  return true
}

// 注册提交逻辑
const onSubmitRegister = () => {
  if (validatePasswords()) {
    const fullEmail = `${emailPrefix.value}@ctbu.edu.cn` // 自动添加邮箱后缀
    console.log(
      '学号:',
      studentId.value,
      '邮箱:',
      fullEmail,
      '密码:',
      password.value
    )
    showSuccessToast('注册成功')
    // 注册成功后的逻辑，比如跳转到登录页面
  }
}
</script>

<template>
  <div class="register-container">
    <img src="@/assets/images/透明队徽.png" alt="团队徽标" class="team-logo" />
    <h1 class="title">注册新用户</h1>

    <van-form @submit="onSubmitRegister" class="form-background">
      <van-field
        v-model="studentId"
        label="学号"
        placeholder="请输入10位学号"
        :rules="formRules.studentId"
        required
      />
      <van-field
        v-model="emailPrefix"
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
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        :rules="formRules.password"
        required
      />
      <van-field
        v-model="confirmPassword"
        label="确认密码"
        type="password"
        placeholder="请再次输入密码"
        required
      />
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
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

.mail_field {
  position: relative;
}

.mail_button {
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
</style>
