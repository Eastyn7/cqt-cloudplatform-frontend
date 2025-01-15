<script setup lang="ts">
import type { FieldRule, FieldValidateTrigger } from 'vant' // 引入正确的类型

// 通知消息
const notification = ref<string>(
  '为了更好地提升我们的服务质量，我们诚挚邀请您提供宝贵的意见和建议'
)

// 表单数据
const isAnonymous = ref<boolean>(false) // 控制是否匿名
const username = ref<string>('')
const phone = ref<string>('')
const studentId = ref<string>('')
const message = ref<string>('')

// 验证规则
const formRules: Record<string, FieldRule[]> = {
  username: [
    {
      required: !isAnonymous.value,
      message: '姓名不能为空',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ],
  phone: [
    { required: false },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式错误',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ],
  studentId: [
    {
      required: !isAnonymous.value,
      message: '学号不能为空',
      trigger: 'onBlur' as FieldValidateTrigger
    },
    {
      pattern: /^\d{8,12}$/,
      message: '学号格式不正确',
      trigger: 'onBlur' as FieldValidateTrigger
    } // 学号假设为8到12位数字
  ],
  message: [
    {
      required: true,
      message: '反馈内容不能为空',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ]
}

// 提交处理
const onSubmit = () => {
  // 提交表单逻辑
  if (isAnonymous.value) {
    console.log('匿名提交反馈')
  } else {
    console.log('实名提交反馈')
  }
  showSuccessToast({
    message: '提交成功',
    position: 'top',
    className: 'custom-normal-toast'
  })
}

// 监听匿名开关状态变化，实时更新验证规则
watch(isAnonymous, (newVal) => {
  formRules.username[0].required = !newVal
  formRules.studentId[0].required = !newVal
})
</script>

<template>
  <div>
    <!-- 小公告 -->
    <NoticeBar :notification="notification" />
    <!-- 队徽队名 -->
    <TeamName />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 姓名 -->
        <van-field
          v-model="username"
          :rules="formRules.username"
          :required="formRules.username[0].required"
          label="姓名"
          placeholder="请输入您的姓名"
          v-if="!isAnonymous"
        />

        <!-- 学号 -->
        <van-field
          v-model="studentId"
          :rules="formRules.studentId"
          :required="formRules.studentId[0].required"
          label="学号"
          placeholder="请输入您的学号"
          v-if="!isAnonymous"
        />

        <!-- 手机号 -->
        <van-field
          v-model="phone"
          :rules="formRules.phone"
          :required="formRules.phone[0].required"
          label="手机号"
          placeholder="请输入您的手机号"
          v-if="!isAnonymous"
        />

        <!-- 反馈内容 -->
        <van-field
          v-model="message"
          :rules="formRules.message"
          :required="formRules.message[0].required"
          rows="2"
          autosize
          label="反馈内容"
          type="textarea"
          maxlength="1000"
          placeholder="请输入反馈内容"
          show-word-limit
        />

        <van-field name="switch" label="匿名提交">
          <template #input>
            <van-switch v-model="isAnonymous" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>
