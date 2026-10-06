import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: '小白油管起步，一路玩到专家',
    description: '从零到专家的 YouTube 起步完全指南（开源，持续更新）',
    base: '/youtube-starter-bible/',
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: [
      // GitHub raw README is outside docs srcDir; site home is /
      /^https?:\/\/creativecommons\.org/
    ],

    head: [
      ['meta', { name: 'theme-color', content: '#ff0000' }],
      ['meta', { name: 'og:type', content: 'website' }],
      ['meta', { name: 'og:locale', content: 'zh_CN' }],
      [
        'meta',
        {
          name: 'og:title',
          content: '小白油管起步，一路玩到专家'
        }
      ],
      [
        'meta',
        {
          name: 'og:description',
          content: '从零到专家的 YouTube 起步完全指南（开源，持续更新）'
        }
      ]
    ],

    themeConfig: {
      logo: undefined,
      siteTitle: '油管起步完全指南',
      outline: { label: '本页目录', level: [2, 3] },
      lastUpdated: { text: '最后更新' },
      darkModeSwitchLabel: '外观',
      lightModeSwitchTitle: '切换到浅色',
      darkModeSwitchTitle: '切换到深色',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部',
      docFooter: { prev: '上一篇', next: '下一篇' },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭'
              }
            }
          }
        }
      },

      nav: [
        { text: '首页', link: '/' },
        { text: '导读', link: '/00-导读' },
        { text: '作战卡', link: '/作战卡' },
        { text: 'FAQ', link: '/11-常见问题FAQ' },
        {
          text: 'GitHub',
          link: 'https://github.com/reed-soul/youtube-starter-bible'
        }
      ],

      sidebar: [
        {
          text: '开始',
          items: [
            { text: '首页', link: '/' },
            { text: '00 · 导读', link: '/00-导读' }
          ]
        },
        {
          text: '正文章节',
          items: [
            { text: '01 · 推荐系统心智模型', link: '/01-推荐系统心智模型' },
            { text: '02 · 冷启动 0 到 1000', link: '/02-冷启动0到1000' },
            { text: '03 · 定位选题与系列化', link: '/03-定位选题与系列化' },
            { text: '04 · 标题封面与包装', link: '/04-标题封面与包装' },
            { text: '05 · 脚本留存与完播', link: '/05-脚本留存与完播' },
            { text: '06 · Shorts 漏斗', link: '/06-Shorts漏斗' },
            { text: '07 · 频道装修与 Studio', link: '/07-频道装修与Studio' },
            { text: '08 · 发布节奏与实验复盘', link: '/08-发布节奏实验与复盘' },
            { text: '09 · 变现与合规红线', link: '/09-变现与合规红线' },
            { text: '10 · 通用审计清单', link: '/10-通用审计清单' },
            { text: '11 · 常见问题 FAQ', link: '/11-常见问题FAQ' },
            { text: '12 · 反例与失败模式', link: '/12-反例与失败模式' }
          ]
        },
        {
          text: '附录与工具',
          items: [
            { text: '作战卡（一页打印）', link: '/作战卡' },
            { text: '图示索引（Mermaid）', link: '/图示' },
            { text: '术语表 GLOSSARY', link: '/GLOSSARY' },
            { text: '来源与主张对照 SOURCES', link: '/SOURCES' }
          ]
        }
      ],

      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/reed-soul/youtube-starter-bible'
        }
      ],

      footer: {
        message:
          '内容采用 <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</a>；站点构建代码可采用 MIT。',
        copyright:
          'Copyright © 2026 「小白油管起步，一路玩到专家」贡献者 · 无任何涨粉保证'
      },

      editLink: {
        pattern:
          'https://github.com/reed-soul/youtube-starter-bible/edit/main/docs/:path',
        text: '在 GitHub 上编辑此页'
      }
    },

    mermaid: {
      theme: 'default'
    },
    mermaidPlugin: {
      class: 'mermaid'
    }
  })
)
