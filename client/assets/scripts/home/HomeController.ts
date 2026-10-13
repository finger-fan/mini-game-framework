/**
 * 首页控制器 - 多平台广告 & 功能演示
 * 
 * 包含：
 * - Banner 广告展示（底部常驻）
 * - 激励视频广告按钮
 * - 插屏广告按钮
 * - 登录 / 分享 / 振动 / 平台信息等演示按钮
 */

import { _decorator, Component, Label, Node, sys } from 'cc';
import { PlatformManager } from './platform/PlatformManager';
const { ccclass, property } = _decorator;

@ccclass('HomeController')
export class HomeController extends Component {

    @property(Label)
    lblPlatform: Label | null = null;

    @property(Label)
    lblStatus: Label | null = null;

    // Banner 广告实例
    private _bannerAd: any = null;

    // 激励视频广告实例
    private _rewardedAd: any = null;

    // 插屏广告实例
    private _interstitialAd: any = null;

    start() {
        // 初始化平台
        PlatformManager.init();

        // 显示当前平台
        const platformName = this.getPlatformName();
        if (this.lblPlatform) {
            this.lblPlatform.string = `平台: ${platformName}`;
        }
        this.log(`当前平台: ${platformName}`);

        // 预加载广告
        this.preloadAds();
    }

    /**
     * 获取当前平台名称
     */
    private getPlatformName(): string {
        if (typeof tt !== 'undefined') return '抖音小游戏';
        if (typeof ks !== 'undefined') return '快手小游戏';
        if (typeof wx !== 'undefined') return '微信小游戏';
        return 'Web 调试';
    }

    /**
     * 预加载广告（激励视频 + 插屏 + Banner）
     */
    private preloadAds() {
        const adapter = PlatformManager.adapter;

        // 创建 Banner 广告
        if (adapter.createBannerAd) {
            this._bannerAd = adapter.createBannerAd();
            if (this._bannerAd) {
                this._bannerAd.onLoad(() => {
                    this.log('Banner 广告加载成功');
                    this.showBannerAd();
                });
                this._bannerAd.onError((err: any) => {
                    this.log(`Banner 广告错误: ${JSON.stringify(err)}`);
                });
            }
        }

        // 创建激励视频广告
        if (adapter.createRewardedVideoAd) {
            adapter.createRewardedVideoAd().then((ad: any) => {
                this._rewardedAd = ad;
                this.log('激励视频广告预加载成功');
            }).catch((err: any) => {
                this.log(`激励视频预加载失败: ${err}`);
            });
        }

        // 创建插屏广告
        if (adapter.createInterstitialAd) {
            adapter.createInterstitialAd().then((ad: any) => {
                this._interstitialAd = ad;
                this.log('插屏广告预加载成功');
            }).catch((err: any) => {
                this.log(`插屏预加载失败: ${err}`);
            });
        }
    }

    // ==================== 广告演示 ====================

    /**
     * 显示 Banner 广告
     */
    playBannerAd() {
        this.showBannerAd();
    }

    private showBannerAd() {
        if (this._bannerAd) {
            try {
                this._bannerAd.show();
                this.log('Banner 广告已显示（底部常驻）');
            } catch (e) {
                this.log(`Banner 显示失败: ${e}`);
            }
        } else {
            this.log('Banner 广告未初始化，当前为 Web 环境');
        }
    }

    /**
     * 隐藏 Banner 广告
     */
    hideBannerAd() {
        if (this._bannerAd) {
            try {
                this._bannerAd.hide();
                this.log('Banner 广告已隐藏');
            } catch (e) {
                this.log(`Banner 隐藏失败: ${e}`);
            }
        }
    }

    /**
     * 播放激励视频广告
     */
    playRewardedVideoAd() {
        this.log('请求激励视频广告...');
        const adapter = PlatformManager.adapter;
        if (adapter.createRewardedVideoAd) {
            adapter.createRewardedVideoAd().then((res: any) => {
                if (res && res.isEnded) {
                    this.log('✅ 用户观看完成，发放奖励！');
                } else {
                    this.log('⚠️ 用户中途关闭，不发奖励');
                }
            }).catch((err: any) => {
                this.log(`激励视频失败: ${err}`);
            });
        } else {
            this.log('当前平台不支持激励视频（Web 环境）');
        }
    }

    /**
     * 播放插屏广告
     */
    playInterstitialAd() {
        this.log('请求插屏广告...');
        const adapter = PlatformManager.adapter;
        if (adapter.createInterstitialAd) {
            adapter.createInterstitialAd().then(() => {
                this.log('插屏广告已展示');
            }).catch((err: any) => {
                this.log(`插屏失败: ${err}`);
            });
        } else {
            this.log('当前平台不支持插屏广告（Web 环境）');
        }
    }

    // ==================== 平台功能演示 ====================

    /**
     * 登录
     */
    login() {
        this.log('正在登录...');
        PlatformManager.adapter.login().then((res: any) => {
            this.log(`✅ 登录成功: ${JSON.stringify(res).substring(0, 50)}`);
        }).catch((err: any) => {
            this.log(`❌ 登录失败: ${err}`);
        });
    }

    /**
     * 获取用户信息
     */
    getUserInfo() {
        this.log('获取用户信息...');
        PlatformManager.adapter.getUserInfo().then((res: any) => {
            this.log(`✅ 用户信息: ${JSON.stringify(res)}`);
        }).catch((err: any) => {
            this.log(`❌ 获取失败: ${err}`);
        });
    }

    /**
     * 分享到好友
     */
    shareAppMessage() {
        const adapter = PlatformManager.adapter;
        if (adapter.onShareAppMessage) {
            adapter.onShareAppMessage('我的小游戏');
            this.log('✅ 已设置分享（好友）');
        } else {
            this.log('当前平台不支持分享');
        }
    }

    /**
     * 分享到朋友圈
     */
    shareTimeline() {
        const adapter = PlatformManager.adapter;
        if (adapter.onShareTimeline) {
            adapter.onShareTimeline('我的小游戏');
            this.log('✅ 已设置分享（朋友圈）');
        } else {
            this.log('当前平台不支持朋友圈分享');
        }
    }

    /**
     * 短振动
     */
    vibrateShort() {
        const adapter = PlatformManager.adapter;
        if (adapter.vibrateShort) {
            adapter.vibrateShort().then(() => {
                this.log('✅ 短振动完成');
            }).catch((err: any) => {
                this.log(`❌ 振动失败: ${err}`);
            });
        } else {
            this.log('当前平台不支持振动');
        }
    }

    /**
     * 长振动
     */
    vibrateLong() {
        const adapter = PlatformManager.adapter;
        if (adapter.vibrateLong) {
            adapter.vibrateLong().then(() => {
                this.log('✅ 长振动完成');
            }).catch((err: any) => {
                this.log(`❌ 振动失败: ${err}`);
            });
        } else {
            this.log('当前平台不支持振动');
        }
    }

    // ==================== 工具方法 ====================

    private log(msg: string) {
        console.log(`[Home] ${msg}`);
        if (this.lblStatus) {
            this.lblStatus.string = msg;
        }
    }

    update(deltaTime: number) {
    }
}
