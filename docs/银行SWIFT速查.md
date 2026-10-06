---
title: AdSense 电汇银行 SWIFT 速查表（大陆主要银行）
description: 招商/工行/建行/中行/农行等 SWIFT，逐家以银行官网核对；可筛选。勿照抄残缺 6 位代码。核对 2026-10-06。
verifiedAt: 2026-10-06
---

# AdSense 电汇：大陆银行 SWIFT 速查

> 相关：[AdSense 电汇收款](adsense-电汇收款.md) · [收款自查清单](收款自查清单.md) · [13 §4](13-中国大陆创作者专章.md#_4-adsense-收款-电汇、银行与结汇)

## 一句话答案

**【官方要求】** AdSense 电汇须填写与银行预留一致的 **SWIFT-BIC**（通常 **8 或 11** 位）；银行须与收款地址**同国**（[1714397](https://support.google.com/adsense/answer/1714397?hl=zh-Hans)）。下表只收录**本站已在银行官网页面读到**的总行/公开汇路代码；**分行代码可能不同——最终问开户行**。

## 速查（可筛选）

<SwiftLookup />

## 未收录说明（交行 / 邮储 · 2026-10-06 复核）

| 银行 | 状态 | 原因 |
|------|------|------|
| 交通银行 | **仍未收录代码** | 见下方复核；官网公开页**未写出**大陆总行 `COMMCNSH` |
| 邮储银行 | **仍未收录代码** | 见下方复核；psbc.com **未公示**自身总行 `PSBCCNBJ` |
| 华夏 / 民生等 | **未收录** | 未完成官网逐家核对 |

**请向开户行或网银「跨境汇款 / 收款路径」页索取你账户适用的 SWIFT。**

### 为何上一轮先跳过

1. **交行**：`bankcomm.com` 在部分现代 TLS 客户端会因 **UnsafeLegacyRenegotiation** 握手失败，抓取得到空页，无法稳定读原文（本轮用兼容配置后已打开）。
2. **邮储**：产品页可打开，但只指导客户填写*对方银行* SWIFT，**从不写邮储自己的总行 BIC**。
3. 第三方目录 / 残缺 6 位码（如 facaimike 的 `COMMCN`）一律不当作收录依据。

### 交通银行复核

- **英文法定名（官网/年报可核）**：`Bank of Communications Co., Ltd.`（[2025 H 股年报 PDF](https://www.bankcomm.com/BankCommSite/file/fileDownload.html?fileId=17075f452dbd43eeaf9d02d2f6864ac0)，自 [投资者关系](https://www.bankcomm.com/BankCommSite/shtml/jyjr/en/2600223/list.shtml) 链出）。
- **官网实际写到的 SWIFT**：离岸汇款「账户行」页只列**境外**交行/代理行码，例如 `COMMHKHHXXX`（港交行）、`COMMDEFFXXX`、`COMMSGSGXXX`、`COMMJPJTXXX` 等——见 [离岸汇款说明](https://www.bankcomm.com/BankCommSite/shtml/jyjr/cn/7387/7610/7621/7622/7625/list.shtml?channelId=7387)（及 [手机站同文](https://m.bankcomm.com/wap/shtml/wap/cn/15165/15168/15180/15206/15215/list.shtml?channelId=2600145)）。**全文无 `COMMCNSH` / `COMMCNSHXXX`。**
- **年报**：同上 PDF 全文检索无 `COMMCNSH`、无 SWIFT/BIC 总行码字段。
- **用户粘贴候选** `COMMCNSH` / `COMMCNSHXXX`、分行例 `COMMCNSHFOS`：**未在上述官网页见到**，故不进速查表。
- **次级佐证（不收录）**：GLEIF LEI [`549300AX1UM10U30HK09`](https://api.gleif.org/api/v1/lei-records/549300AX1UM10U30HK09) 的 `bic` 数组含 `COMMCNSHXXX`（另有多家境外分行码）；Wise/XE 等目录亦列同码——**仅次级**，不能替代银行域名原文。

### 邮储银行复核

- **英文法定名（官网可核）**：`POSTAL SAVINGS BANK OF CHINA CO.,LTD.`（[联系我们](https://www.psbc.com/cn/common/lxwm/)）；金融许可证页写法接近 `POSTAL SAVINGS BANK OF CHINA Co., Ltd.`（[金融许可证信息](http://www.psbc.com/cn/common/jrxkzxx/)）。地址：北京西城区金融大街 3 号。
- **官网汇款页**： [银邮汇款](https://www.psbc.com/cn/grfw/cdh/wh/gjhk/202010/t20201014_5924.html) / [EN Cross-Border Remittance](https://www.psbc.com/en/products_and_services/personal/feb/202011/t20201124_45679.html) 要求客户提供**收款行** SWIFT BIC（8 或 11 位），**不公布邮储总行码**。全文无 `PSBCCNBJ`。
- **用户粘贴候选** `PSBCCNBJ` / `PSBCCNBJXXX`：**未在 psbc.com 打开页见到**，故不进速查表。
- **次级佐证（不收录）**：GLEIF LEI [`300300C1040311005298`](https://api.gleif.org/api/v1/lei-records/300300C1040311005298) 的 `bic` 为 `["PSBCCNBJXXX"]`；第三方目录同——**仅次级**。

### 收录门槛（不变）

只有**银行官网页面（或该行域名上的汇路/年报 PDF）原文**出现的 8/11 位 BIC 才进入上方 `<SwiftLookup />`。GLEIF / SWIFT 公开映射 / 支付 App 目录一律标次级、不进表。

## 核实状态（本页 · 2026-10-06）

| # | 银行 | SWIFT | 状态 | 主来源 |
|---|------|-------|------|--------|
| A | 招商银行总行 | CMBCCNBS | **可核** | [english.cmbchina.com BIC 表](https://english.cmbchina.com/cmbInfo/about/detailInfo?guid=0c310cee-51b8-4de6-9ec4-96f8563e57dd) |
| B | 工商银行总行 | ICBKCNBJ | **可核** | [icbc.com.cn 汇路](https://www.icbc.com.cn/icbc/html/branches/beijing/guanggao/wh_040831/whgg/whhk061218.htm)（同页亦有北京分行 ICBKCNBJBJM） |
| C | 中国银行总行 | BKCHCNBJ | **可核** | [boc.cn SWIFT 名录](https://www.boc.cn/aboutboc/ab6/200810/t20081016_7363.html) |
| D | 建设银行 | PCBCCNBJXXX | **可核（信用卡汇路页）** | [ccb.com FAQ](https://ccb.com/faq/20130930_475197001/questionlist_1.html) |
| E | 农业银行 | ABOCCNBJXXX | **可核** | [ru.abchina.com Requisites](http://www.ru.abchina.com/en/Requisites/) |
| F | 交行 | — | **未收录（复核）** | 离岸页/年报无 COMMCNSH；GLEIF 次级见上 |
| G | 邮储 | — | **未收录（复核）** | 银邮汇款页无 PSBCCNBJ；GLEIF 次级见上 |

**声明**：非银行意见；代码变更以官网与开户行当日告知为准。
