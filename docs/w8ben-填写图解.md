---
title: YouTube W-8BEN 怎么填？字段图解（中国税收居民）
description: 按 AdSense YouTube 税务工具路径说明 W-8BEN：个人 vs 实体、永久居住地址、外国税号、中美条约特许权使用费 10%、Other Copyright Royalties。示意图非真实截图，不是税务建议。核对 2026-10-06。
verifiedAt: 2026-10-06
---

# YouTube W-8BEN 怎么填？字段图解（中国税收居民）

> 相关：[13 §5 美国税务](13-中国大陆创作者专章.md#_5-美国税务信息-w-8ben) · [AdSense 电汇收款](adsense-电汇收款.md) · [收款自查清单](收款自查清单.md) · [大陆 FAQ](13-大陆FAQ.md)

## 一句话答案

**【官方】** 所有启用创收的创作者都要向 Google 提交美国税务信息；美国境外的个人受益所有人通常使用 **W-8BEN**（实体用 **W-8BEN-E**）。未提交时，个人账号可能按**全球总收入最高约 24%** 预扣；提交有效信息后，预扣通常只针对**美国境内观看者**带来的适用收入，税率常见 **0–30%**（视居住国与协定）。中美税收协定特许权使用费上限为毛额的 **10%**（[10391362](https://support.google.com/youtube/answer/10391362?hl=zh-Hans) · [10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans) · [IRS 中美条约 Art.11](https://www.irs.gov/pub/irs-trty/china.pdf) · [Table 1](https://www.irs.gov/pub/irs-lbi/tax-treaty-table-1.pdf)）。

> **【重要】** YouTube / Google **不提供**税务建议；本页只整理公开 Help 与 IRS 原文。下列示意图是本站用 HTML/CSS 重画的字段说明，**不是任何人的真实截图**，也**不替你勾选**任何选项。请咨询合格税务专业人士。

---

## 在后台怎么进入税务工具

**【官方路径】**（[10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans)）

1. 登录 AdSense YouTube 广告账号  
2. **收款 → 收款信息 → 管理设置**  
3. 支付资料 →「美国税务信息」旁的修改图标 → **管理税务信息**  
4. 按页面指南作答；系统会根据答案自动生成表单  

建议每年检查一次；若符合条件，官方写明请在每年约 **12 月 10 日**前申请税收条约优惠。

<W8benMock view="flow" />

---

## 选哪张表？个人还是实体？

**【官方】**（[10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans) · [10735961](https://support.google.com/adsense/answer/10735961?hl=zh-Hans)）

| 你是谁 | 常见表单 | 用途 |
|--------|----------|------|
| 美国人 / 美国公司 / 美国合伙企业等 | **W-9** | 美国人士 |
| 美国境外个人，且是所得的受益所有人 | **W-8BEN** | 可用来申请税收条约优惠 |
| 美国境外实体，且是受益所有人 | **W-8BEN-E** | 同上；实体还须证明符合条约「优惠限制」条款 |
| 收入与涉美贸易或企业有实际关联 | **W-8ECI** | 须提供美国 TIN |
| 某些中介 / 合伙 / 流通实体 | **W-8IMY** | 可能另要分配声明 |

本页只展开 **W-8BEN**。你是否符合「美国境外个人受益所有人」，以税务工具问答与专业意见为准——本站不替你下结论。

---

## W-8BEN 字段逐项（示意）

字段编号与英文名来自 IRS《Instructions for Form W-8BEN》（**Rev. October 2021**）。Google 的税务工具用问答生成表单，界面顺序可能不同，但含义对应。

**【字符限制 · 官方】** 纳税表单里的**问题**可以有本地语言，但**字段**只能填 `a–z`、`A–Z`、`0–9`、空格、连字符 `-` 和符号 `&`。有护照 / 驾照上的拉丁字母写法，请参考证件；否则可能需要音译（[10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans)）。

<W8benMock view="form" />

### 中美税收协定里和 YPP 最相关的公开数字

| 公开来源 | 写了什么 | 本站怎么读 |
|----------|----------|------------|
| 中美税收协定 **Article 11** 第 2 款 | 特许权使用费（royalties）在来源国征税，受益所有人情况下**不超过毛额的 10%** | 这是条约**上限框架**，不是保证后台一定显示 10% |
| IRS *Tax Treaty Table 1*（Rev. May 2023）「China, People's Rep. of」行 | Know-How / Patents / Film & TV / Copyrights 各列为 **10**；Treaty Article 列印作 **II(2)**（对应协定第 11 条第 2 款）；工业设备租金列为 **7v**（脚注：对毛额的 70% 按 10% 征税） | YPP 语境下 Google 点名的是 **Other Copyright Royalties**；设备租金规则与典型 YPP 版税主张不同 |
| YouTube / AdSense Help | 建议考虑勾选的收入类型：① **其他版权版税**（如 YPP、Google Play）② **影片和电视版税** ③ **服务**（如 AdSense）；应选择**所有**你有资格主张优惠的类型；Google 只对实际支付的收入类型使用对应主张 | **本站不替你勾选**；以税务顾问意见与工具当日选项为准 |

主文献：[china.pdf Art.11](https://www.irs.gov/pub/irs-trty/china.pdf) · [Table 1 PDF](https://www.irs.gov/pub/irs-lbi/tax-treaty-table-1.pdf) · [10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans)


### 中国税收居民的外国税号（Line 6a）是什么？

> **【非税务建议】** 下列只整理公开法规与 OECD / IRS 原文；是否以及如何填写，请以税务工具当日提示与合格顾问为准。

**【中国国内法】**

- 《个人所得税法》**第九条**：「纳税人有中国公民身份号码的，以中国公民身份号码为纳税人识别号；纳税人没有中国公民身份号码的，由税务机关赋予其纳税人识别号。」（[全文](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_901ca8faba104739bbf54e22483e6079.html)）  
- 国家税务总局公告 **2018 年第 59 号**第二条同旨：「有中国公民身份号码的，以其中国公民身份号码作为纳税人识别号」；自 2019-01-01 施行（[国务院部门文件转载](https://www.gov.cn/zhengce/zhengceku/2019-10/28/content_5445927.htm) · [税总局原文入口](https://www.chinatax.gov.cn/chinatax/n810341/n810765/n3359382/201812/c4182780/content.html)）。

**【OECD AEOI · China TIN】** OECD《Information on Tax Identification Numbers · China》写明：Individual 使用中国身份证作为身份证明时，**「TIN is the ID number」**；结构为 18 位数字或 17 位数字 + `X`（[China-TIN.pdf](https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/china-tin.pdf) · [门户索引](https://www.oecd.org/en/networks/global-forum-tax-transparency/resources/aeoi-implementation-portal/tax-identification-numbers.html)，核对 2026-10-06）。

**【IRS W-8BEN 说明 · Line 6a / 6b】**（[Instructions for Form W-8BEN (Rev. 10/2021)](https://www.irs.gov/instructions/iw8ben)）

- Line **6a**：在美国金融机构持有金融账户、且有关联需在 Form 1042-S 报告的美国来源收入时，一般须提供居民国签发的 FTIN，**除非**你是美国属地居民，或你的居民国列在 IRS [List of jurisdictions that do not issue foreign TINs](https://www.irs.gov/businesses/corporations/list-of-jurisdictions-that-do-not-issue-foreign-tins) 上。  
- Line **6b**：仅在依法无需从居民国取得 FTIN（含该国不签发 TIN）时可勾选。  
- **核对 2026-10-06**：该 IRS 名单公开列出的辖区包括 Australia、Bermuda、British Virgin Islands、Cayman Islands、Japan 等；**未见 China / People’s Republic of China**。结合中国国内法与 OECD，中国**签发**纳税人识别号（对持身份证的个人即公民身份号码），**不属于**「不签发外国税号」辖区。

**【Google】** 申请条约优惠需要提供外国或美国纳税人识别号；「哪种号码可以接受」原文仍建议咨询当地税务部门（[10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans)）。本站据此只陈述「中国国内法下公民身份号码 = 自然人纳税人识别号」这一事实，**不**写成「你在 AdSense 里必须填身份证号」的操作指令。

### 审核状态与常见拒因

**【官方】**（[10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans)）

| 状态 | 含义 |
|------|------|
| **审核中** | 正在接受审核；最多可能需要 **7 个工作日**；可能要求补交身份证明 |
| **已批准** | 已提交、已审核、已被系统接受（页面显示绿色） |
| **已拒绝** | 常见原因：TIN 在 IRS 记录中找不到 / 名字与 TIN 不符 / 无法用你提供的文件验证 |

W-8 常见触发审核的原因（官方原文摘要）：法定名字或非独立实体名字与付款资料不符；居住 / 邮寄地址在美国，或与申请条约的国家不一致；地址是「转交」或邮政信箱。

提交后请回到「美国税务信息」，核对显示的**预扣税率**——以该页为准。

---

## 表单会过期；填错了怎么改

**【官方】**

- 即使信息没变，表单也会在**提交之年后的第三个完整日历年结束时**失效，需要每隔几年重提（例：2021 年 6 月提交 → 约 2024 年底失效）（[10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans) · IRS W-8BEN 说明）。  
- 情况变化且影响表单有效性时，表单自变化之日起失效，须立即重提。  
- 改地址时，更新后的永久地址须在「永久居住地址」和「法定地址」两处保持一致，以免 1042-S 等年终表格寄错。  
- 适用创作者可能在每年 **4 月 14 日或之前**收到上一年度预扣相关的年终表单（如 **1042-S**）（[10391362](https://support.google.com/youtube/answer/10391362?hl=zh-Hans)）。  
- 某些情况下，若在日历年结束前提供更新后的有效税表，Google 可能重新计算并退还部分预扣差额；过期则只能直接向 IRS 申请——细节以 Help 与专业意见为准。

---

## 常见追问

### 我没有美国观众，还要填吗？

**【官方】** 要。无论是否已经通过美国境内观看者赚到钱，所有 YPP 创作者都应提交；将来若有美国来源收入，税表可用来确定正确的预扣税率（[10391362](https://support.google.com/youtube/answer/10391362?hl=zh-Hans)）。

### Google 按什么判定我是不是「美国境内创作者」？

**【官方】** 根据你在税务信息中**声明的居住国家/地区**（[10391362](https://support.google.com/youtube/answer/10391362?hl=zh-Hans)）。

### 会被美国和中国双重征税吗？

**【官方】** Google 只会按要求从美国境内观看者带来的适用 YouTube 收入中预扣美国税费；你在居住国可能还有本地纳税义务。许多国家签订了减少双重征税的条约，部分国家允许外国税收抵免——**请咨询税务顾问**（[10391362](https://support.google.com/youtube/answer/10391362?hl=zh-Hans)）。本站不写「怎么选最省税」。

### 能要到盖章的收入证明吗？

**【官方】** 每笔款项都有付款收据（收款 → 查看交易 → 自动付款链接）；但官方写明**无法提供**任何打印、签名或盖章的凭证（[14732067](https://support.google.com/youtube/answer/14732067?hl=zh-Hans)）。

---

## 核实状态（本页 · 2026-10-06）

| # | 议题 | 结论摘要 | 状态 | 主来源 |
|---|------|----------|------|--------|
| A | 未提交预扣 | 个人全球约 24%；企业境外美国来源约 30% | **可核** | [10391362](https://support.google.com/youtube/answer/10391362?hl=zh-Hans) |
| B | 已提交区间 | 美国来源收入 0–30%，视条约 | **可核** | 同上 |
| C | 表单类型 | 境外个人 W-8BEN；实体 W-8BEN-E | **可核** | [10390801](https://support.google.com/youtube/answer/10390801?hl=zh-Hans) |
| D | 字段与字符 | Line 1–10；拉丁字符限制；有效期第三完整日历年末 | **可核** | IRS iw8ben · 10390801 |
| E | 中美 Royalties | 条约 10% 上限；Table 1 Copyrights=10 | **可核** | china.pdf · Table 1 |
| F | 收入类型勾选 | Other Copyright Royalties / Services 等；选所有有资格的 | **可核** | 10390801 · 10735961 |
| G | 审核 / 年终表 | ≤7 工作日；1042-S 约 4/14 前 | **可核** | 10390801 · 10391362 |
| H | 中国 FTIN / Line 6a | 公民身份号码 = 自然人纳税人识别号（个税法九条 · 税总 2018/59）；OECD：ID card → TIN is ID number；中国不在 IRS「不签发 FTIN」名单 | **可核** | 个税法 · 税总 2018/59 · OECD China-TIN · IRS iw8ben · IRS FTIN 名单 |
| I | Line 6b | 中国签发 TIN，一般不适用「FTIN not legally required」勾选 | **可核** | IRS iw8ben · IRS FTIN 名单 |

**声明**：非法律或税务意见。不提供「中国居民唯一正确截图」。
