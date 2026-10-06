---
title: AdSense 电汇银行 SWIFT 速查表（大陆主要银行）
description: 招/工/中/建/农官网已核；交行/邮储总行经 Swift BIC Search 命中（非官网）；勿用 COMMCNSHFOS。核对 2026-10-06。
verifiedAt: 2026-10-06
---

# AdSense 电汇：大陆银行 SWIFT 速查

> 相关：[AdSense 电汇收款](adsense-电汇收款.md) · [收款自查清单](收款自查清单.md) · [13 §4](13-中国大陆创作者专章.md#_4-adsense-收款-电汇、银行与结汇)

## 一句话答案

**【官方要求】** AdSense 电汇须填写与银行预留一致的 **SWIFT-BIC**（通常 **8 或 11** 位）；银行须与收款地址**同国**（[1714397](https://support.google.com/adsense/answer/1714397?hl=zh-Hans)）。速查表分两档：**官网**（银行域名原文）与 **SWIFT 目录**（[BIC Search](https://www.swiftref.com/en/bicsearch) 命中、非官网）；**分行代码可能不同——最终问开户行**。

## 速查（可筛选）

<SwiftLookup />

## 怎么查到自己开户行的 SWIFT

可靠性大致顺序（本站建议按此优先，**不要只信第三方网站表**）：

1. **开户行柜台 / 电话客服**（最高）— 报出卡号后请柜员或客服读出**该账户适用**的 8 或 11 位 SWIFT-BIC，并确认是否必须用分行码。  
   - 交通银行客服：**[95559](tel:95559)**（亦见官网页脚常见公示）  
   - 邮储银行客服：**[95580](tel:95580)** / 40088-95580（见 [联系我们](https://www.psbc.com/cn/common/lxwm/)）  
2. **银行 App / 网银在线客服** — 在「跨境汇款 / 收款路径 / 外汇」相关入口询问同一问题。  
3. **[Swift 官方 BIC Search](https://www.swift.com/bsl/)**（跳转 [swiftref.com/en/bicsearch](https://www.swiftref.com/en/bicsearch)；需验证码）— 可核对某 BIC **是否登记在目录中**，**不能替代**开户行对「你这张卡该填哪条」的确认。  
4. **银行官网公开汇路/BIC 页** — 「官网」表行只采信这一层已打开核对过的原文。  
5. **第三方目录 / 博客 / 支付 App 列表**（最低）— 仅作线索，**禁止**当作 AdSense 填写依据。

**本站不会**根据城市或分行名（例如「佛山分行」）生成个性化电汇模板或替你填写 AdSense 字段。

## 交行 / 邮储说明（官网未公示 · SWIFT 目录已核）

| 银行 | 速查表 | 说明 |
|------|--------|------|
| 交通银行总行 | **已收录 · SWIFT 目录** `COMMCNSHXXX` | 银行官网公开页仍未找到原文；以开户行确认为准 |
| 邮储银行总行 | **已收录 · SWIFT 目录** `PSBCCNBJXXX` | 同上 |
| 网传「佛山交行」`COMMCNSHFOS` | **不收录 · 不推荐** | BIC Search **两次查询 0 条**（2026-10-06） |
| 华夏 / 民生等 | **未收录** | 未完成官网或 BIC Search 核对 |

**请向开户行或网银「跨境汇款 / 收款路径」页索取你账户适用的 SWIFT。**

### 为何一度跳过交行 / 邮储

1. **交行**：`bankcomm.com` 在部分现代 TLS 客户端会因 **UnsafeLegacyRenegotiation** 握手失败；且离岸汇款页只列境外账户行码，不写大陆总行 `COMMCNSH`。
2. **邮储**：产品页只指导填写*对方银行* SWIFT，**不写邮储自身总行 BIC**。
3. 第三方目录 / 残缺 6 位码（如 facaimike 的 `COMMCN`）一律不当作收录依据。

### 交通银行 · 官网侧

- **英文法定名（年报可核）**：`Bank of Communications Co., Ltd.`（[2025 H 股年报 PDF](https://www.bankcomm.com/BankCommSite/file/fileDownload.html?fileId=17075f452dbd43eeaf9d02d2f6864ac0)）。
- **官网实际写到的 SWIFT**：离岸汇款页仅境外码（`COMMHKHHXXX` 等）——[离岸汇款说明](https://www.bankcomm.com/BankCommSite/shtml/jyjr/cn/7387/7610/7621/7622/7625/list.shtml?channelId=7387)。**无 `COMMCNSH` 原文。**
- **次级**：GLEIF LEI [`549300AX1UM10U30HK09`](https://api.gleif.org/api/v1/lei-records/549300AX1UM10U30HK09) 含 `COMMCNSHXXX`——不替代官网，也不替代下节 BIC Search。

### 邮储银行 · 官网侧

- **英文法定名**：[联系我们](https://www.psbc.com/cn/common/lxwm/) `POSTAL SAVINGS BANK OF CHINA CO.,LTD.`。
- **汇款页**：[银邮汇款](https://www.psbc.com/cn/grfw/cdh/wh/gjhk/202010/t20201014_5924.html) 要求填收款行 BIC，**不公布邮储总行码**。
- **次级**：GLEIF [`300300C1040311005298`](https://api.gleif.org/api/v1/lei-records/300300C1040311005298) → `PSBCCNBJXXX`。

### SWIFT BIC Search 核对（2026-10-06）

入口：[https://www.swift.com/bsl/](https://www.swift.com/bsl/) → [https://www.swiftref.com/en/bicsearch](https://www.swiftref.com/en/bicsearch)（免登录免费检索；[条款](https://www.swift.com/about-us/legal/online-services/free-bic-search-swiftcom)）。截图：`/workspace/yt-design/swift-bic/`。

| 查询 | 结果 | 目录登记名（摘要） |
|------|------|-------------------|
| `COMMCNSHXXX` | **VALID**（总行） | BANK OF COMMUNICATIONS,CO. LTD., SHANGHAI, CHINA；前缀 `COMMCNSH` 约 270 条 |
| `PSBCCNBJXXX` | **VALID**（总行） | POSTAL SAVINGS BANK OF CHINA, BEIJING, CHINA；前缀 `PSBCCNBJ` 共 5 条（XXX / 020 / 443 / CSD / ZSH） |
| `COMMCNSHFOS` | **NOT FOUND（0 BICs）** · 查两次 | **勿使用**；流通的「佛山交行 COMMCNSHFOS」当日不在免费目录中 |

以上两条总行码以 **「SWIFT 目录」** 徽章进入速查表（**不是**「官网」）；**始终以开户行当面确认为准**。本站**不**生成佛山或其他分行个性化电汇模板。

### 收录门槛

| 档 | 进入速查表？ | 条件 |
|----|--------------|------|
| **官网** | 是 · 徽章「官网」 | 银行域名页面/汇路 PDF **原文**出现该 BIC |
| **SWIFT 目录** | 是 · 徽章「SWIFT 目录」 | 免费 BIC Search **命中**；须注明官网尚未公示、以开户行为准 |
| GLEIF / 第三方博客 | 否（脚注） | 仅佐证 |
| 目录 0 命中（如 `COMMCNSHFOS`） | **否 · 不推荐** | — |

## 核实状态（本页 · 2026-10-06）

| # | 银行 | SWIFT | 状态 | 主来源 |
|---|------|-------|------|--------|
| A | 招商银行总行 | CMBCCNBS | **官网可核** | [cmbchina.com BIC 表](https://english.cmbchina.com/cmbInfo/about/detailInfo?guid=0c310cee-51b8-4de6-9ec4-96f8563e57dd) |
| B | 工商银行总行 | ICBKCNBJ | **官网可核** | [icbc.com.cn 汇路](https://www.icbc.com.cn/icbc/html/branches/beijing/guanggao/wh_040831/whgg/whhk061218.htm) |
| C | 中国银行总行 | BKCHCNBJ | **官网可核** | [boc.cn SWIFT 名录](https://www.boc.cn/aboutboc/ab6/200810/t20081016_7363.html) |
| D | 建设银行 | PCBCCNBJXXX | **官网可核（信用卡汇路页）** | [ccb.com FAQ](https://ccb.com/faq/20130930_475197001/questionlist_1.html) |
| E | 农业银行 | ABOCCNBJXXX | **官网可核** | [ru.abchina.com Requisites](http://www.ru.abchina.com/en/Requisites/) |
| F | 交行总行 | COMMCNSHXXX | **SWIFT 目录可核** · 官网无原文 | [BIC Search](https://www.swiftref.com/en/bicsearch) 2026-10-06 |
| G | 邮储总行 | PSBCCNBJXXX | **SWIFT 目录可核** · 官网无原文 | 同上 |
| H | 网传佛山 `COMMCNSHFOS` | — | **目录 0 命中 · 不推荐** | BIC Search 两次 0 |

**声明**：非银行意见；代码变更以官网、BIC 目录与开户行当日告知为准。
