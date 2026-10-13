import { PlatformAdapter } from "./PlatformAdapter";
import { DouyinSDK } from "../sdk/DouyinSDK";

export class DouyinAdapter implements PlatformAdapter {
    async login() {
        return DouyinSDK.login();
    }

    async getUserInfo() {
        return DouyinSDK.getUserInfo();
    }

    async vibrateShort() {
        return DouyinSDK.vibrateShort();
    }

    async vibrateLong() {
        return DouyinSDK.vibrateLong();
    }

    async onShareAppMessage(title: string) {
        return DouyinSDK.onShareAppMessage(title);
    }

    async onShareTimeline(title: string) {
        return DouyinSDK.onShareTimeline(title);
    }

    async createRewardedVideoAd() {
        return DouyinSDK.createRewardedVideoAd();
    }

    async createInterstitialAd() {
        return DouyinSDK.createInterstitialAd();
    }

    createBannerAd() {
        return DouyinSDK.createBannerAd();
    }
}
