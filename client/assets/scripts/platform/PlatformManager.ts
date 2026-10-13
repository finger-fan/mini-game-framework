import { PlatformAdapter } from "./adapter/PlatformAdapter";
import { WechatAdapter } from "./adapter/WechatAdapter";
import { WebAdapter } from "./adapter/WebAdapter";
import { DouyinAdapter } from "./adapter/DouyinAdapter";
import { KuaishouAdapter } from "./adapter/KuaishouAdapter";

export class PlatformManager {
    static adapter: PlatformAdapter;

    static init() {
        // 抖音小游戏环境
        if (typeof tt !== "undefined") {
            this.adapter = new DouyinAdapter();
        }
        // 快手小游戏环境
        else if (typeof ks !== "undefined") {
            this.adapter = new KuaishouAdapter();
        }
        // 微信小游戏环境
        else if (typeof wx !== "undefined") {
            this.adapter = new WechatAdapter();
        }
        // Web 调试环境
        else {
            this.adapter = new WebAdapter();
        }
    }
}
