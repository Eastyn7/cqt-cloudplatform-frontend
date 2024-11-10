<script setup lang="ts">
import { formToJson } from '@/utils/formToJson'
import { useUserStore } from '@/stores'
import type { UserInfo } from '@/stores'

const userStore = useUserStore()

const userInfo = ref<UserInfo>({
  auth_id: 0,
  studentId: '默认ID',
  email: '默认邮箱',
  nickname: '昵称',
  username: '姓名',
  gender: 0,
  avatar: '',
  phone: '默认电话',
  bio: '这是我的个人简介。'
})

// @ts-ignore
const originalUserInfo = ref<UserInfo>({})
const isEditing = ref(false)

const startEditing = () => {
  isEditing.value = true
  originalUserInfo.value = { ...userInfo.value }
}

const saveChanges = async () => {
  isEditing.value = false

  const updates: Partial<UserInfo> = {}

  for (const key in userInfo.value) {
    const typedKey = key as keyof UserInfo
    if (userInfo.value[typedKey] !== originalUserInfo.value[typedKey]) {
      // @ts-ignore
      updates[typedKey] = userInfo.value[typedKey]
    }
  }

  if (Object.keys(updates).length > 0) {
    try {
      await userStore.updateAuthInfo(
        formToJson({ auth_id: userInfo.value.auth_id, updates })
      )
      showToast('信息更新成功')
      originalUserInfo.value = { ...userInfo.value }
    } catch (error) {
      console.error('更新信息失败', error)
      userInfo.value = { ...originalUserInfo.value }
      showToast('更新信息失败，请重试')
    }
  } else {
    showToast('没有修改任何信息')
  }
}

// 压缩图片函数
const compressImage = (
  file: File,
  maxWidth = 800,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        // 压缩图片质量
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }

      img.onerror = (error) => reject(error)
    }

    reader.onerror = (error) => reject(error)
  })
}

const uploadAvatar = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    try {
      // 压缩图片
      const compressedBase64 = await compressImage(file)
      userInfo.value.avatar = compressedBase64
      showToast('头像压缩并上传成功')
    } catch (error) {
      console.error('头像上传失败', error)
      showToast('头像上传失败，请重试')
    }
  }
}

onMounted(() => {
  userInfo.value = { ...userStore.userInfo }
})
</script>

<template>
  <div>
    <van-nav-bar title="个人资料" fixed placeholder />

    <!-- 头像部分 -->
    <div style="text-align: center; margin: 20px 0">
      <label for="avatar-upload" style="cursor: pointer">
        <img
          :src="userInfo.avatar || 'https://via.placeholder.com/80'"
          alt="avatar"
          style="width: 80px; height: 80px; border-radius: 50%"
        />
      </label>
      <!-- 当处于编辑模式时才显示提示 -->
      <p v-if="isEditing">点击头像修改</p>
      <input
        :disabled="!isEditing"
        id="avatar-upload"
        type="file"
        accept="image/*"
        style="display: none"
        @change="uploadAvatar"
      />
    </div>

    <!-- 个人信息部分 -->
    <van-cell-group>
      <!-- 用户名 -->
      <van-field
        v-model="userInfo.nickname"
        label="用户名"
        :disabled="!isEditing"
        :input-align="'left'"
      />

      <!-- 真实姓名（不可修改） -->
      <van-field
        v-model="userInfo.username"
        label="真实姓名"
        :disabled="true"
        :input-align="'left'"
        :class="isEditing ? 'disabled-field' : ''"
      />

      <!-- 学号（不可修改） -->
      <van-field
        v-model="userInfo.studentId"
        label="学号"
        :disabled="true"
        :input-align="'left'"
        :class="isEditing ? 'disabled-field' : ''"
      />

      <!-- 手机号 -->
      <van-field
        v-model="userInfo.phone"
        label="手机号"
        :disabled="!isEditing"
        :input-align="'left'"
      />

      <!-- 邮箱（不可修改） -->
      <van-field
        v-model="userInfo.email"
        label="邮箱"
        :disabled="true"
        :input-align="'left'"
        :class="isEditing ? 'disabled-field' : ''"
      />

      <!-- 性别 -->
      <van-field label="性别" :disabled="!isEditing" :input-align="'left'">
        <template #input>
          <van-radio-group
            :disabled="!isEditing"
            v-model="userInfo.gender"
            direction="horizontal"
          >
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
            <van-radio name="0">保密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 个人简介 -->
      <van-field
        v-model="userInfo.bio"
        label="个人简介"
        type="textarea"
        rows="3"
        :autosize="{ maxHeight: 100 }"
        maxlength="150"
        placeholder="请输入个人简介"
        show-word-limit
        :disabled="!isEditing"
      />
    </van-cell-group>

    <!-- 编辑按钮 -->
    <div style="margin: 16px">
      <van-button v-if="!isEditing" type="primary" block @click="startEditing">
        修改个人信息
      </van-button>
      <van-button v-else type="success" block @click="saveChanges">
        保存修改
      </van-button>
    </div>

    <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
  </div>
</template>

<style scoped>
.disabled-field input {
  background-color: #f5f5f5;
  color: #aaa;
}
</style>
