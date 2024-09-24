<script setup lang="ts">
// 用户的个人信息
const userInfo = ref({
  avatar: '', // 用户头像
  username: '用户名',
  realName: '张三', // 真实姓名，不能修改
  studentId: '20230001', // 学号，不能修改
  phone: '12345678901',
  email: 'example@example.com',
  gender: 0, // 性别：0 = 不填写，1 = 男，2 = 女
  bio: '这是我的个人简介。'
})

const isEditing = ref(false) // 标记是否处于编辑模式

// 进入编辑模式
const startEditing = () => {
  isEditing.value = true
}

// 提交修改
const saveChanges = () => {
  isEditing.value = false
}

// 上传头像
const uploadAvatar = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    userInfo.value.avatar = URL.createObjectURL(file)
    showToast('头像上传成功')
  }
}
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
        v-model="userInfo.username"
        label="用户名"
        :disabled="!isEditing"
        :input-align="'left'"
      />

      <!-- 真实姓名（不可修改） -->
      <van-field
        v-model="userInfo.realName"
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

      <!-- 邮箱 -->
      <van-field
        v-model="userInfo.email"
        label="邮箱"
        :disabled="!isEditing"
        :input-align="'left'"
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
