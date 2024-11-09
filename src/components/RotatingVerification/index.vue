<template>
    <!-- 弹窗 -->
    <div v-if="show" class="dialog layout_c layout_v layout_r">
        <div class="captcha layout_v" ref="captchaRef">
            <div class="subhead">人机验证</div>
            <div class="tips">{{ tips }}</div>
            <div class="image">
                <div class="imageContainer layout_r" :class="status == StatusType.VERIFYING ? 'checking' : ''">
                    <div class="src" :style="{
                        backgroundImage: `url(${imgUrl})`,
                        transform: `rotate(${angle}deg) scale(1.1)`,
                        transitionProperty: `${isDragging ? '' : 'all'}`,
                    }"></div>
                    <!-- SVG动画 -->
                    <div class="successImg">
                        <img v-if="status == StatusType.SUCCESS" class="successImgDom" src="@/assets/images/success.svg"
                            alt="">
                    </div>
                </div>

                <!-- 验证成功 -->
                <div class="icon layout_c" v-if="false">
                    <i class="success">验证成功</i>
                </div>
            </div>

            <div class="slider layout_r" ref="sliderRef">
                <div class="sliderItemContainer layout_c" :style="{
                    marginLeft: `${currentWidth}px`,
                    transitionProperty: `${isDragging ? '' : 'margin,box-show,background-color'
                        }`,
                }" @touchstart="dragStart" @touchmove.prevent="dragMove" @touchend="dragEnd" @mousedown="dragStart"
                    @mousemove.prevent="dragMove" @mouseup="dragEnd" @dragstart="dragStart" @dragend="dragEnd"
                    @dragover.stop @drop="dragMove" @mouseleave="mouseLeave">
                    <div class="sliderItem layout_c">
                        <div class="i-drag layout_c iconfont icon-RectangleCopy58" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineExpose } from 'vue'
import { throttle } from 'lodash';
type SessionConfig = {
    img: string,
    onVerifying: (angle: number) => Promise<{
        success: boolean,
        msg: string
    }>
}
// 定义控制器
class Handler {

    public onVerifying: (angle: number) => Promise<{
        success: boolean;
        msg: string;
    }> = () => new Promise((r) => r({ success: false, msg: '验证失败' }));

    open(config: SessionConfig) {
        imgUrl.value = config.img
        show.value = true;
        this.onVerifying = config.onVerifying
    }

    close() {
        this.clean();
        show.value = false
    }

    clean() {
        // 重置弹窗
        status.value = StatusType.WAIT;
        tips.value = messages.default
        currentWidth.value = 0;
        angle.value = 0;
    }
}
let handler = new Handler();

// 图片地址
let imgUrl = ref('');

const messages = {
    default: '滑动滑块，使图片角度为正',
    verifying: '请稍后，验证中...',
    error: '请重试...',
    success: '验证成功！',
}

const StatusType = {
    WAIT: 0,
    VERIFYING: 1,
    SUCCESS: 2,
    ERROR: 3
}

const sliderWidth = 220 // 滚动条长度

let show = ref(false)

const sliderRef = ref<HTMLElement | null>(null)
onMounted(() => {
    sliderRef.value?.addEventListener('mousemove', dragMove)
    sliderRef.value?.addEventListener('mouseup', dragEnd)
})

onUnmounted(() => {
    sliderRef.value?.removeEventListener('mousemove', dragMove)
    sliderRef.value?.removeEventListener('mouseup', dragEnd)
})

let isDragging = false // 是否拖动
let startX = 0 // 开始拖动位置
let currentWidth = ref(0) // 距离左侧宽度
let angle = ref(0)
let dragStart = function (e: MouseEvent | TouchEvent) {
    isDragging = true
    // 移动端
    if (e.type == 'touchstart') {
        startX = (e as TouchEvent).touches[0].clientX
    } else {
        startX = (e as MouseEvent).clientX
    }
}

let dragMove = throttle(function (e: MouseEvent | TouchEvent) {
    if (isDragging) {
        let deltaX = 0
        // 移动端
        if (e.type == 'touchmove') {
            deltaX = (e as TouchEvent).touches[0].clientX - startX
        } else {
            deltaX = (e as MouseEvent).clientX - startX
        }
        let newLeft = deltaX

        // 限制滑块在合法范围内移动
        if (newLeft < 0) {
            newLeft = 0
        } else if (newLeft > sliderWidth) {
            newLeft = sliderWidth
        }
        currentWidth.value = newLeft

        angle.value = (currentWidth.value / sliderWidth) * 360
    }
})

let mouseLeave = function () {
    dragEnd()
}


let tips = ref(messages.default)
const status = ref(StatusType.WAIT) // 验证状态
let dragEnd = async function () {
    // 解决点击验证的问题
    if (!isDragging || currentWidth.value == 0) {
        isDragging = false
        return
    }
    isDragging = false
    // 验证中
    tips.value = messages.verifying
    status.value = StatusType.VERIFYING;
    let result = await handler.onVerifying(angle.value);
    if (result.success) {
        status.value = StatusType.SUCCESS;
        tips.value = result.msg || messages.success;
        setTimeout(() => {
            handler.close()
        }, 2000)
        return;
    } else {// 验证错误
        handler.clean();
        tips.value = result.msg || messages.error;
    }
}

defineExpose({
    handler
})

</script>

<style scoped lang="less">
.dialog {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99999;
    position: absolute;
    top: 0;
    left: 0;

    .captcha {
        align-items: center;
        width: 300px;
        height: 400px;
        border-radius: 20px;
        background-color: #fff;

        .subhead {
            color: #8799a3;
            font-size: 14px;
            margin-top: 20px;
        }

        .tips {
            font-size: 17px;
            color: #333333;
            margin-top: 20px;
        }

        .image {
            height: 150px;
            width: 150px;
            margin-top: 30px;

            .imageContainer {
                height: 150px;
                width: 150px;
                overflow: hidden;
                border-radius: 50%;
                background-color: #eee;

                .src {
                    transform: translateZ(0); // 开启硬件加速
                    will-change: transform; // 提前告诉浏览器这个元素会被改变
                    background-size: cover;
                    height: 150px;
                    width: 150px;
                    border-radius: 50%;
                    transition-property: none;
                    transition-duration: 0.5s;
                }

                .successImg {
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .icon {
                height: 100%;
                width: 100%;
            }
        }

        .slider {
            margin-top: 30px;
            width: 250px;
            height: 40px;
            border-radius: 40px;
            background-color: #eee;

            .sliderItemContainer {
                width: 100px;
                height: 100px;
                left: -30px;
                top: -30px;
                transition-property: box-shadow, background-color;
                transition-duration: 0.5s;

                .sliderItem {
                    width: 40px;
                    height: 40px;
                    background-color: #fff;
                    border-radius: 40px;
                    line-height: 40px;
                    color: #000;
                    font-size: 15px;
                    font-weight: bold;
                    box-shadow: 1px 1px 10px 5px #888888;
                    user-select: none;
                    transition-property: box-shadow, background-color;
                    transition-duration: 0.5s;

                    .i-drag {
                        font-size: 25px;
                    }
                }

                .sliderItem:hover {
                    box-shadow: 1px 1px 50px 5px #2196f3;
                    background-color: #2196f3;
                    color: #fff;
                }
            }
        }
    }
}

.checking {
    animation: checking 1.5s infinite;
}

@keyframes checking {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}
</style>
