import { PlatformAdapter } from "./PlatformAdapter";

export class WebAdapter implements PlatformAdapter {
    async login() {
        return {
            uid: "test_001",
            token: "debug_token"
        };
    }

    async getUserInfo() {
        return { nickName: "Dev (Web)", platform: "web" };
    }

    async vibrateShort() {
        console.log('[Web] 短振动（模拟）');
    }

    async vibrateLong() {
        console.log('[Web] 长振动（模拟）');
    }

    async createRewardedVideoAd() {
        console.log('[Web] 激励视频广告（模拟 - 请在真实平台测试）');
        return { isEnded: true };
    }

    async createInterstitialAd() {
        console.log('[Web] 插屏广告（模拟 - 请在真实平台测试）');
        return true;
    }

    createBannerAd() {
        console.log('[Web] Banner 广告（模拟 - 请在真实平台测试）');
        return {
            show: () => console.log('[Web] Banner 显示'),
            hide: () => console.log('[Web] Banner 隐藏'),
            onLoad: (cb: Function) => { cb(); },
            onError: (cb: Function) => {}
        };
    }

    async onShareAppMessage(title: string) {
        console.log(`[Web] 分享设置: ${title}`);
    }

    async onShareTimeline(title: string) {
        console.log(`[Web] 朋友圈分享设置: ${title}`);
    }
}
