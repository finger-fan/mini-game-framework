import { douyinConfig } from "../../config/DouyinConfig";

export class DouyinSDK {
    static login(): Promise<any> {
        return new Promise((resolve, reject) => {
            tt.login({
                timeout: douyinConfig.timeout,
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
            tt.getUserInfo({
                success(res: any) {
                    resolve(res.userInfo);
                },
                fail(err: any) {
                    reject(err);
                }
            });
        });
    }

    static vibrateShort(): Promise<any> {
        return new Promise((resolve, reject) => {
            tt.vibrateShort({
                type: douyinConfig.vibrateType,
                success: (res) => { resolve(res) },
                fail: (res) => { reject(res) }
            });
        });
    }

    static vibrateLong(): Promise<any> {
        return new Promise((resolve, reject) => {
            tt.vibrateLong({
                success: (res) => { resolve(res) },
                fail: (res) => { reject(res) }
            });
        });
    }

    static onShareAppMessage(title: string): Promise<any> {
        return new Promise((resolve, reject) => {
            tt.onShareAppMessage(function () {
                return { title: title };
            });
            resolve(true);
        });
    }

    static onShareTimeline(title: string): Promise<any> {
        return new Promise((resolve, reject) => {
            tt.onShareTimeline(function () {
                return { title: title };
            });
            resolve(true);
        });
    }

    static createRewardedVideoAd(): Promise<any> {
        return new Promise((resolve, reject) => {
            let ad = tt.createRewardedVideoAd({
                adUnitId: douyinConfig.rewardedVideoID
            });

            ad.onLoad(() => {
                console.log('[Douyin] 激励广告加载成功');
            });

            ad.onError((err) => {
                console.error('[Douyin] 激励广告错误：', err);
                reject(err);
            });

            ad.onClose((res) => {
                console.log('[Douyin] 激励广告关闭：', res.isEnded);
                resolve(res);
            });

            ad.show().catch(err => {
                console.error('[Douyin] 激励广告显示失败：', err);
            });
        });
    }

    static createInterstitialAd(): Promise<any> {
        return new Promise((resolve, reject) => {
            let ad = tt.createInterstitialAd({
                adUnitId: douyinConfig.interstitialID
            });

            ad.onLoad(() => {
                console.log('[Douyin] 插屏广告加载成功');
            });

            ad.onError((err) => {
                console.error('[Douyin] 插屏广告错误：', err);
                reject(err);
            });

            ad.onClose(() => {
                console.log('[Douyin] 插屏广告关闭');
                resolve(true);
            });

            ad.show().catch(err => {
                console.error('[Douyin] 插屏广告显示失败：', err);
            });
        });
    }

    static createBannerAd() {
        return tt.createBannerAd({
            adUnitId: douyinConfig.bannerID,
            style: {
                left: 0,
                top: 0,
                width: 320
            }
        });
    }
}
