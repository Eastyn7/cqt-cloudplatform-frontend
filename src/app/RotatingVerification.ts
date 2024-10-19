import RotatingVerificationCom from '@/components/RotatingVerification/index.vue';
import { showFailToast, showSuccessToast, Toast } from 'vant';
import api from '@/api/auth';
type RequestData = {
    sign: string;
}
type ResponseData = {
    success: boolean;
    session: string;
}

class RotatingVerification {
    private handlerVue?: InstanceType<typeof RotatingVerificationCom>;

    initHandler(handlerVue: InstanceType<typeof RotatingVerificationCom> | undefined) {
        this.handlerVue = handlerVue;
    }

    getHandler() {
        return this.handlerVue?.handler;
    }

    request(data: RequestData | undefined): Promise<ResponseData> {
        return new Promise(async (solve) => {
            if (this.getHandler() == undefined) {
                showFailToast("无法显示验证服务窗口")
                solve({
                    success: false,
                    session: ""
                })
                return;
            }

            // 请求图片 {code: 0, data: {img: string, key: string}}
            let imgRes = await api.getVerifyImg();

            if (imgRes == undefined
                || imgRes.data == undefined) {
                solve({
                    success: false,
                    session: ''
                });
                return;
            }

            switch (imgRes.code) {
                case 0: { break };
                case -504: {
                    showSuccessToast('请求繁忙')
                    solve({
                        success: false,
                        session: ''
                    })
                    return;
                }
            }

            let retry = 0;


            this.getHandler()?.open({
                img: imgRes.data.img,
                onVerifying: async (angle: number) => {
                    // 验证 {code: 0, data: {message: string, key: string}}
                    let res = await api.verifyAnswer(
                        {
                            angle: angle.toString(),
                            key: imgRes.data.key!
                        }
                    )

                    switch (res.code) {
                        case 0: {
                            solve({
                                session: imgRes!.data!.key!,
                                success: true
                            });
                            return {
                                success: true,
                                msg: '验证成功'
                            }
                        }
                        default: {
                            retry++;
                            if (retry >= 3) {
                                showFailToast('请稍后重试')
                                solve({
                                    session: imgRes!.data!.key!,
                                    success: false
                                });
                                setTimeout(() => {
                                    this.getHandler()?.close();
                                })
                            }
                            return {
                                success: false,
                                msg: "验证失败"
                            }
                        }
                    }
                }
            });


        })
    }
}

const rotatingVerification = new RotatingVerification();

export {
    rotatingVerification as RobotVerification,
}