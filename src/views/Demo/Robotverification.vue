<script setup lang='ts'>
import { RobotVerification } from "@/app/RotatingVerification";
const fn = async () => {
    const res = await RobotVerification.request({
        sign: 'test'
    })
    console.log(res)
}
</script>

<template>
    <div>
        <van-button @click="fn()">人机验证</van-button>
    </div>
</template>

<style scoped></style>