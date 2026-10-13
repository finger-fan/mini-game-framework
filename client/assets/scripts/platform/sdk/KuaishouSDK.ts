import { kuaishouConfig } from "../../config/KuaishouConfig";

export class KuaishouSDK {
    static login(): Promise<any> {
        return new Promise((resolve, reject) => {
            ks.login({
                timeout: kuaishouConfig.timeout,
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
            ks.getUserInfo({
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
            ks.vibrateShort({
                success: (res) => { resolve(res) },
                fail: (res) => { reject(res) }
            });
        });
    }

    static vibrateLong(): Promise<any> {
        return new Promise((resolve, reject) => {
            ks.vibrateLong({
                success: (res) => { resolve(res) },
                fail: (res) => { reject(res) }
            });
        });
    }

    static onShareAppMessage(title: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ks.onShareAppMessage(function () {
                return { title: title };
            });
            resolve(true);
        });
    }

    static onShareTimeline(title: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ks.onShareTimeline(function () {
                return { title: title };
            });
            resolve(true);
        });
    }

    static createRewardedVideoAd(): Promise<any> {
        return new Promise((resolve, reject) => {
            let ad = ks.createRewardedVideoAd({
                adUnitId: kuaishouConfig.rewardedVideoID
            });

            ad.onLoad(() => {
                console.log('[Kuaishou] 激励广告加载成功');
            });

            ad.onError((err) => {
                console.error('[Kuaishou] 激励广告错误：', err);
                reject(err);
            });

            ad.onClose((res) => {
                console.log('[Kuaishou] 激励广告关闭：', res.isEnded);
                resolve(res);
            });

            ad.show().catch(err => {
                console.error('[Kuaishou] 激励广告显示失败：', err);
            });
        });
    }

    static createInterstitialAd(): Promise<any> {
        return new Promise((resolve, reject) => {
            let ad = ks.createInterstitialAd({
                adUnitId: kuaishouConfig.interstitialID
            });

            ad.onLoad(() => {
                console.log('[Kuaishou] 插屏广告加载成功');
            });

            ad.onError((err) => {
                console.error('[Kuaishou] 插屏广告错误：', err);
                reject(err);
            });

            ad.onClose(() => {
                console.log('[Kuaishou] 插屏广告关闭');
                resolve(true);
            });

            ad.show().catch(err => {
                console.error('[Kuaishou] 插屏广告显示失败：', err);
            });
        });
    }

    static createBannerAd() {
        return ks.createBannerAd({
            adUnitId: kuaishouConfig.bannerID,
            style: {
                left: 0,
                top: 0,
                width: 320
            }
        });
    }
}
