<script setup lang="ts">
import { useRoute } from 'vue-router'
import  volunteerActivity  from '@/utils/volunteerActivity'
import { useApplyStore } from '@/stores/modules/signup'
const applyStore = useApplyStore()
const route = useRoute()
// 当前活动
const currentActivity =ref(volunteerActivity.value.find(
  item => item.id === Number(route.params.id)
)
)
const { activitySignupInfo, handleApply: storeHandleApply, handleCancelApply: storeHandleCancelApply } = applyStore;
// 报名
const handleApply = () => {
    if (currentActivity.value) {
        storeHandleApply(currentActivity.value.id, currentActivity.value);
    }
};
// 取消报名
const handleCancelApply = () => {
    if (currentActivity.value) {
        storeHandleCancelApply(currentActivity.value.id);
    }
};


</script>
<template>
    <div v-if="currentActivity " >
        <van-image
  width="100%"
  height="100%"
  lazy-load
  radius="20px"
  :src="currentActivity.photo"
/>
<div class="activity-info">
    <div class="activity-title">
            <strong>{{ currentActivity.name }}</strong>
            <span>
                已报名:<span style="color: darkmagenta;">{{activitySignupInfo[currentActivity.id]?.recruitedNum || 0 }}</span>/{{ currentActivity.num }}
            </span>
        </div>
  <p>{{currentActivity.startTime}}--{{ currentActivity.deadline }}</p>
  <p style="color: darkmagenta; font-size: small;">截止报名时间:{{ currentActivity.deadline }}</p>
  <strong>活动类型:</strong>
  <p>{{ currentActivity.type }}</p>
  <strong>活动简介:</strong>
  <p>{{ currentActivity.intro }}</p>
  <strong>活动地点:</strong>
  <p>{{ currentActivity.place }}</p>
  <strong>活动详情:</strong>
  <p>{{ currentActivity.content }}</p>
</div>
<div class="apply">
     <!-- 报名 -->
     <van-button v-if="!(activitySignupInfo[currentActivity.id]?.isApplied)"  type="primary" width="100%" @click="handleApply">点击报名</van-button>
     <!-- 取消报名 -->
     <van-button v-else type="danger" width="100%" @click="handleCancelApply">取消报名</van-button>
</div>
    </div>
</template>



<style scoped>
.activity-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
}
.activity-title strong {
    font-size: 20px;
    font-weight: bold;
}
.activity-info {
 background-color: #fff; 
 /* 设置圆角*/
    border-radius: 20px;
    padding: 10px;
    margin: 10px;
    padding-bottom: 50px;
    
}
span {
font-size: small;  
 right: 10px;
}
.activity-info p {
    word-wrap: break-word;
    /* 强制在任意字符处换行 */
    word-break: break-all;
     text-indent: 2em;
}
.apply {
    text-align: center;
    position: fixed;
    bottom: 5px;
    width: 100%;
    justify-content: center;
}

</style>