# Mini Game Framework

基于 Cocos Creator 3.x 的小游戏多平台开发壳，配置好广告参数即可快速发布到微信、抖音、快手等平台。

## 特性

- **多平台自动识别**：`PlatformManager.init()` 自动检测抖音(tt)、快手(ks)、微信(wx)、Web 环境
- **三大平台广告接入**：激励视频 / 插屏 / Banner，接口统一
- **平台能力封装**：登录、分享、振动、用户信息等
- **配置即接入**：只需填写 Config 中的 AppID 和广告位 ID
- **演示首页**：内置完整的广告和功能演示按钮

## 平台支持

| 平台 | 适配器 | 登录 | 激励视频 | 插屏 | Banner | 分享 | 振动 |
|------|--------|------|----------|------|--------|------|------|
| 微信小游戏 | WechatAdapter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 抖音小游戏 | DouyinAdapter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 快手小游戏 | KuaishouAdapter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Web 调试 | WebAdapter | ✅ | 模拟 | 模拟 | 模拟 | 模拟 | 模拟 |

## 快速开始

### 1. 配置广告位

根据发布平台修改对应的配置文件：

```
client/assets/scripts/config/WechatConfig.ts    // 微信
client/assets/scripts/config/DouyinConfig.ts    // 抖音
client/assets/scripts/config/KuaishouConfig.ts  // 快手
```

填写 `appid` 和三个广告位 ID（`rewardedVideoID`、`interstitialID`、`bannerID`）即可。

### 2. 在 Cocos Creator 中使用

1. 用 Cocos Creator 3.x 打开 `client` 文件夹
2. 在首页场景中绑定 `HomeController.ts` 脚本
3. 构建 → 选择目标平台（微信/抖音/快手小游戏）→ 发布

### 3. 平台自动识别

无需手动选择平台，代码中 `PlatformManager.init()` 会自动检测运行环境：

```typescript
PlatformManager.init();
const adapter = PlatformManager.adapter;

// 激励视频
adapter.createRewardedVideoAd().then(res => {
    if (res.isEnded) { /* 发放奖励 */ }
});

// 插屏
adapter.createInterstitialAd();

// Banner
const banner = adapter.createBannerAd();
banner.show();
```

## 项目结构

```
client/                          ← Cocos Creator 前端项目
├── assets/scripts/
│   ├── config/                  ← 平台配置文件
│   │   ├── WechatConfig.ts
│   │   ├── DouyinConfig.ts
│   │   └── KuaishouConfig.ts
│   ├── home/                    ← 首页演示
│   │   └── HomeController.ts
│   ├── platform/                ← 平台适配层
│   │   ├── PlatformManager.ts   ← 总入口，自动识别平台
│   │   ├── adapter/             ← 各平台适配器
│   │   │   ├── PlatformAdapter.ts  ← 统一接口
│   │   │   ├── WechatAdapter.ts
│   │   │   ├── DouyinAdapter.ts
│   │   │   ├── KuaishouAdapter.ts
│   │   │   └── WebAdapter.ts
│   │   └── sdk/                 ← 各平台 SDK 封装
│   │       ├── WechatSDK.ts
│   │       ├── DouyinSDK.ts
│   │       └── KuaishouSDK.ts
│   ├── core/                    ← 核心基础库
│   └── app/                     ← 游戏业务逻辑（留空，自行填充）
demo/                            ← 纯前端演示版本（无需后端）
server/                          ← PHP 后端（可选）
```

## 广告收益参考

| 广告类型 | eCPM 范围 | 单次展示 |
|---------|-----------|---------|
| 激励视频 | 35-80 元 | ~5 分钱 |
| 插屏 | 12-35 元 | ~2 分钱 |
| Banner | 2-8 元 | ~0.5 分钱 |

## 许可证

MIT

## 来源

Forked from [tinygeeker/cocosCreatorFrame](https://github.com/tinygeeker/cocosCreatorFrame)，新增抖音、快手平台适配，重构为统一接口 + 自动识别架构。
