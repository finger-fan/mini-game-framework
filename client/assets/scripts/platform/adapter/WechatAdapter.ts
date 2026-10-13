import { PlatformAdapter } from "./PlatformAdapter";
import { WechatSDK } from "../sdk/WechatSDK";

export class WechatAdapter implements PlatformAdapter {
    async login() {
        return WechatSDK.login();
    }

    async getUserInfo() {
        return WechatSDK.getUserInfo();
    }

    async vibrateShort() {
        return WechatSDK.vibrateShort();
    }

    async vibrateLong() {
        return WechatSDK.vibrateLong();
    }

    async onShareAppMessage(title: string) {
        return WechatSDK.onShareAppMessage(title);
    }

    async onShareTimeline(title: string) {
        return WechatSDK.onShareTimeline(title);
    }

    async createRewardedVideoAd() {
        return WechatSDK.createRewardedVideoAd();
    }

    async createInterstitialAd() {
        return WechatSDK.createInterstitialAd();
    }

    createBannerAd() {
        return WechatSDK.createBannerAd();
    }
}
