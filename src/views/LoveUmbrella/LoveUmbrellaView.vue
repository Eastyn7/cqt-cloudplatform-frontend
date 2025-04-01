<script setup lang="ts">
import { useUserStore } from '@/stores'
import { QrcodeStream } from 'vue-qrcode-reader'
import jsQR from 'jsqr'

const userStore = useUserStore()

// 默认激活借伞 Tab
const activeTab = ref('borrow')

// 存储扫码结果（雨伞编码）及表单数据
const scanResult = ref<string>('')

// 存储二维码扫描或图片上传选项
const useScanner = ref(true) // true: 使用摄像头扫描，false: 上传图片
const form = ref({
  username: '',
  studentId: '',
  email: '',
  code: '' // 雨伞编码
})

// 控制扫码区域显示
const showScanner = ref(false)

// 登录后自动填充用户信息
const fillUserInfo = () => {
  const { username, studentId, email } = userStore.userInfo
  form.value = { username, studentId, email, code: '' } // 重置form，确保清晰赋值
}

// 弹出框选择扫描方式
const chooseScannerMethod = () => {
  showConfirmDialog({
    title: '选择扫描方式',
    message: '使用摄像头扫码【确定】\n上传二维码图片【取消】'
  })
    .then(() => {
      useScanner.value = true
      showScanner.value = true
    })
    .catch(() => {
      // 选择了上传图片
      useScanner.value = false
    })
}

// 扫码成功后将获取的编码填入表单
const onScanSuccess = (code: string) => {
  scanResult.value = code
  form.value.code = code
  showToast('扫码成功')
}

// 处理二维码扫描错误
const onScanError = (error: any) => {
  console.error('二维码扫描错误:', error)
  showToast('二维码扫描失败，请重试')
}

// 处理图片上传解析二维码
const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return showToast('请选择一个文件')

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // 确保canvas的尺寸与图片一致
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)

        // 获取图像数据并解析二维码
        try {
          const imageData = ctx.getImageData(0, 0, img.width, img.height)
          // 打印图像数据来检查是否正确获取
          console.log('Image Data:', imageData)

          // 将 Uint8ClampedArray 转换为 Uint8Array
          const uint8Array = new Uint8Array(imageData.data.buffer)

          const code = jsQR(uint8Array, img.width, img.height)
          console.log('Parsed QR Code:', code)

          if (code) {
            scanResult.value = code.data
            form.value.code = code.data
            showToast('二维码解析成功')
          } else {
            showToast('未找到二维码')
          }
        } catch (error) {
          console.error('二维码解析错误:', error)
          showToast('二维码解析失败，请重试')
        }
      }
    }
    img.src = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// 提交借伞请求
const submitBorrow = async () => {
  console.log('提交借伞开始')
  try {
    if (!form.value.code) {
      showFailToast({
        message: '请先扫码获取雨伞编码',
        position: 'top',
        className: 'custom-fail-toast'
      })
      return
    }
    // 调用借伞服务
    const record = await userStore.borrowUmbrella(form.value.code)
    console.log('借伞成功:', record)
    showSuccessToast({
      message: '借伞成功',
      position: 'top',
      className: 'custom-normal-toast'
    })
  } catch (error: any) {
    console.error('提交借伞失败:', error)
    showFailToast({
      message: error.response.data.message,
      position: 'top',
      className: 'custom-fail-toast'
    })
  }
}

// 提交还伞请求
const submitReturn = async () => {
  console.log('提交还伞开始')
  try {
    if (!form.value.code) {
      showFailToast({
        message: '请先扫码获取雨伞编码',
        position: 'top',
        className: 'custom-fail-toast'
      })
      return
    }
    // 调用还伞服务
    const message = await userStore.returnUmbrella(form.value.code)
    showSuccessToast({
      message: message,
      position: 'top',
      className: 'custom-normal-toast'
    })
  } catch (error: any) {
    console.error('提交还伞失败:', error)
    showFailToast({
      message: error.response.data.message,
      position: 'top',
      className: 'custom-fail-toast'
    })
  }
}

// 页面加载时自动填充用户信息
onMounted(fillUserInfo)
</script>

<template>
  <div class="login-container">
    <img src="@/assets/images/透明队徽.png" alt="团队徽标" class="team-logo" />
    <h1 class="title">欢迎您使用爱心雨伞</h1>

    <!-- 借伞和还伞切换 -->
    <van-tabs v-model="activeTab">
      <van-tab title="借伞" name="borrow">
        <van-form class="form-background">
          <van-field v-model="form.studentId" label="学号" required readonly />
          <van-field v-model="form.username" label="姓名" required readonly />
          <van-field v-model="form.email" label="邮箱" required readonly />
          <van-field v-model="form.code" label="雨伞编码" required readonly />

          <van-row class="two-button">
            <van-col span="12">
              <van-button
                style="width: 100%"
                round
                type="success"
                block
                @click="chooseScannerMethod"
              >
                扫码获取编码
              </van-button>
            </van-col>
            <van-col span="12">
              <van-button round type="primary" @click="submitBorrow" block>
                借伞
              </van-button>
            </van-col>
          </van-row>
        </van-form>
      </van-tab>

      <van-tab title="还伞" name="return">
        <van-form class="form-background">
          <van-field v-model="form.studentId" label="学号" required readonly />
          <van-field v-model="form.username" label="姓名" required readonly />
          <van-field v-model="form.email" label="邮箱" required readonly />
          <van-field v-model="form.code" label="雨伞编码" required readonly />

          <van-row class="two-button">
            <van-col span="12">
              <van-button
                style="width: 100%"
                round
                type="success"
                block
                @click="chooseScannerMethod"
              >
                扫码获取编码
              </van-button>
            </van-col>
            <van-col span="12">
              <van-button round type="primary" @click="submitReturn" block>
                还伞
              </van-button>
            </van-col>
          </van-row>
        </van-form>
      </van-tab>

      <!-- 显示二维码扫描区域 -->
      <div v-if="useScanner && showScanner" class="scanner-container">
        <qrcode-stream @decode="onScanSuccess" @error="onScanError" />
      </div>

      <!-- 上传二维码图片 -->
      <div v-if="!useScanner" class="upload-container">
        <input type="file" accept="image/*" @change="handleImageUpload" />
      </div>
    </van-tabs>
  </div>
  <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
</template>

<style scoped>
.login-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
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
  margin: 0 0 10px 0;
}

.two-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.van-button {
  margin: 20px 0 10px 0;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.scanner-container,
.upload-container {
  text-align: center;
}

.upload-container input {
  width: 100%;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
