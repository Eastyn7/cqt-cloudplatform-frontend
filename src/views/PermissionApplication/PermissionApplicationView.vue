<script setup lang="ts">
import type { FieldRule, FieldValidateTrigger } from 'vant' // 导入正确的类型

// 通知消息
const notification = ref<string>(
  '目前只支持青队成员可以申请权限哦~后续也会为普通用户提供权限福利！'
)

// 表单数据
const username = ref<string>('') // 姓名
const studentId = ref<string>('') // 学号
const reson = ref<string>('') // 申请原因
const right = ref<string>('') // 申请权限
const showPicker = ref<boolean>(false) // 控制选择器的显示
const right_columns = [
  { text: '超级管理员', value: '1' },
  { text: '管理员', value: '2' }
]

// 验证规则
const formRules: Record<string, FieldRule[]> = {
  username: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ],
  studentId: [
    {
      required: true,
      message: '学号不能为空',
      trigger: 'onBlur' as FieldValidateTrigger
    },
    {
      pattern: /^\d{8,12}$/,
      message: '学号格式不正确',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ],
  right: [
    {
      required: true,
      message: '请选择要申请的权限',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ],
  reson: [
    {
      required: true,
      message: '申请原因不能为空',
      trigger: 'onBlur' as FieldValidateTrigger
    }
  ]
}

// 提交处理
const onSubmit = () => {
  showSuccessToast({
    message: '提交成功',
    position: 'top',
    className: 'custom-normal-toast'
  })
}

// 选择确认事件处理
const onConfirm = ({
  selectedOptions
}: {
  selectedOptions: { text: string; value: string }[]
}) => {
  right.value = selectedOptions[0]?.text || ''
  showPicker.value = false
}
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
        />

        <!-- 学号 -->
        <van-field
          v-model="studentId"
          :rules="formRules.studentId"
          :required="formRules.studentId[0].required"
          label="学号"
          placeholder="请输入您的学号"
        />

        <!-- 申请权限 -->
        <van-field
          v-model="right"
          :rules="formRules.right"
          :required="formRules.right[0].required"
          is-link
          readonly
          name="picker"
          label="选择器"
          placeholder="点击选择权限"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="top">
          <van-picker
            :columns="right_columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>

        <!-- 申请原因 -->
        <van-field
          v-model="reson"
          :rules="formRules.reson"
          :required="formRules.reson[0].required"
          rows="2"
          autosize
          label="申请原因"
          type="textarea"
          maxlength="1000"
          placeholder="请输入申请原因"
          show-word-limit
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <Divider dividerText="人工智能学院 “小红帽”常青藤青年志愿者服务队" />
  </div>
</template>

<style scoped></style>
