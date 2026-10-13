import { PlatformAdapter } from "./PlatformAdapter";
import { KuaishouSDK } from "../sdk/KuaishouSDK";

export class KuaishouAdapter implements PlatformAdapter {
    async login() {
        return KuaishouSDK.login();
    }

    async getUserInfo() {
        return KuaishouSDK.getUserInfo();
    }

    async vibrateShort() {
        return KuaishouSDK.vibrateShort();
    }

    async vibrateLong() {
        return KuaishouSDK.vibrateLong();
    }

    async onShareAppMessage(title: string) {
        return KuaishouSDK.onShareAppMessage(title);
    }

    async onShareTimeline(title: string) {
        return KuaishouSDK.onShareTimeline(title);
    }

    async createRewardedVideoAd() {
        return KuaishouSDK.createRewardedVideoAd();
    }

    async createInterstitialAd() {
        return KuaishouSDK.createInterstitialAd();
    }

    createBannerAd() {
        return KuaishouSDK.createBannerAd();
    }
}
