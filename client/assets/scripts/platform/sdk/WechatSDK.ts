import { wechatConfig } from "../../config/WechatConfig";

export class WechatSDK {
    static login(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.login({
                timeout: wechatConfig.timeout,
                success(res: any) {
                    resolve(res);
                },
                fail(err: any) {
                    reject(err);
                }
            });
        });
    }

    static getUserInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                success(res: any) {
                    resolve(res.userInfo);
                },
                fail(err: any) {
                    reject(err);
                }
            });
        });
    }

    static writePhotosAlbum(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success(res) {
                                wx.saveImageToPhotosAlbum()
                                resolve(res);
                            },
                            fail(err: any) {
                                reject(err);
                            }
                        })
                    }
                }
            })
        })
    }

    static createUserInfoButton(): Promise<any> {
        return new Promise((resolve, reject) => {
            const button = wx.createUserInfoButton({
                type: 'text',
                text: '获取用户信息',
                style: {
                    left: 10,
                    top: 76,
                    width: 200,
                    height: 40,
                    lineHeight: 40,
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            })
            button.onTap((res) => {
                resolve(res);
            })
        })
    }

    static createFeedbackButton(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.createFeedbackButton({
                type: 'text',
                text: '打开意见反馈页面',
                style: {
                    left: 10,
                    top: 76,
                    width: 200,
                    height: 40,
                    lineHeight: 40,
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            })
            resolve(true);
        })
    }

    static scanCode(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.scanCode({
                onlyFromCamera: wechatConfig.onlyFromCamera,
                success(res) {
                    resolve(res)
                },
                fail(err: any) {
                    reject(err);
                }
            })
        })
    }

    static vibrateShort(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.vibrateShort({
                type: wechatConfig.vibrateType,
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        });
    }

    static vibrateLong(): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.vibrateLong({
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        });
    }

    static onShareAppMessage(title: string): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.onShareAppMessage(function () {
                return {
                    title: title
                }
            })
            resolve(true)
        });
    }

    static onShareTimeline(title: string): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.onShareTimeline(function () {
                return {
                    title: title
                }
            })
            resolve(true)
        });
    }

    static createRewardedVideoAd(): Promise<any> {
        return new Promise((resolve, reject) => {
            let ad = wx.createRewardedVideoAd({
                adUnitId: wechatConfig.rewardedVideoID
            })

            ad.onLoad(() => {
                console.log('[Wechat] 激励广告加载成功');
            })

            ad.onError((err) => {
                console.error('[Wechat] 激励广告错误：', err)
                reject(err)
            })

            ad.onClose((res) => {
                console.log('[Wechat] 激励广告关闭：', res.isEnded)
                resolve(res)
            })

            ad.show().catch(err => {
                console.error('[Wechat] 激励广告显示失败：', err)
            })
        });
    }

    static createInterstitialAd(): Promise<any> {
        return new Promise((resolve, reject) => {
            let ad = wx.createInterstitialAd({
                adUnitId: wechatConfig.interstitialID
            })

            ad.onLoad(() => {
                console.log('[Wechat] 插屏广告加载成功');
            })

            ad.onError((err) => {
                console.error('[Wechat] 插屏广告错误：', err)
                reject(err)
            })

            ad.onClose(() => {
                console.log('[Wechat] 插屏广告关闭');
                resolve(true);
            })

            ad.show().catch(err => {
                console.error('[Wechat] 插屏广告显示失败：', err)
            })
        });
    }

    static createBannerAd() {
        return wx.createBannerAd({
            adUnitId: wechatConfig.bannerID,
            style: {
                left: 0,
                top: 0,
                width: 320
            }
        });
    }
}
