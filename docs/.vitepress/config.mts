import { defineConfig, type HeadConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const SITE_ORIGIN = 'https://creator.taoliapp.com/'
const SITE_HOST = 'https://creator.taoliapp.com'
const SITE_BASE = '/'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: '小白油管起步，一路玩到专家',
    description: '从零到专家的 YouTube 起步完全指南（开源，持续更新）',
    base: SITE_BASE,
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: [
      // GitHub raw README is outside docs srcDir; site home is /
      /^https?:\/\/creativecommons\.org/
    ],

    sitemap: {
      // trailing slash required so relative page paths resolve under base
      hostname: `${SITE_HOST}${SITE_BASE}`
    },

    head: [
      ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
      ['link', { rel: 'apple-touch-icon', href: '/logo.svg' }],
      ['meta', { name: 'theme-color', content: '#c81e1e' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:site_name', content: '小白油管起步，一路玩到专家' }],
      [
        'meta',
        {
          property: 'og:title',
          content: '小白油管起步，一路玩到专家'
        }
      ],
      [
        'meta',
        {
          property: 'og:description',
          content: '从零到专家的 YouTube 起步完全指南（开源 · 官方优先 · 持续更新）'
        }
      ],
      ['meta', { property: 'og:image', content: `${SITE_HOST}/og.png` }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:image', content: `${SITE_HOST}/og.png` }]
    ],

    transformPageData(pageData) {
      const rel =
        pageData.relativePath === 'index.md'
          ? ''
          : pageData.relativePath.replace(/\.md$/, '').replace(/\/index$/, '')
      const canonicalUrl =
        pageData.relativePath === 'index.md'
          ? SITE_ORIGIN
          : `${SITE_HOST}/${rel}`

      const title =
        (pageData.frontmatter.title as string | undefined) || pageData.title
      const description =
        (pageData.frontmatter.description as string | undefined) ||
        (pageData.description as string | undefined) ||
        '从零到专家的 YouTube 起步完全指南（开源，持续更新）'

      pageData.frontmatter.head ??= []
      const head = pageData.frontmatter.head as HeadConfig[]

      head.push(['link', { rel: 'canonical', href: canonicalUrl }])
      head.push(['meta', { property: 'og:url', content: canonicalUrl }])
      head.push(['meta', { property: 'og:title', content: title }])
      head.push(['meta', { property: 'og:description', content: description }])
      head.push(['meta', { name: 'twitter:title', content: title }])
      head.push(['meta', { name: 'twitter:description', content: description }])

      // Article + BreadcrumbList JSON-LD for doc chapters (not home)
      if (pageData.relativePath !== 'index.md') {
        const dateModified =
          pageData.lastUpdated
            ? new Date(pageData.lastUpdated).toISOString()
            : new Date().toISOString()
        const jsonLd = {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: title,
              description,
              inLanguage: 'zh-CN',
              dateModified,
              mainEntityOfPage: canonicalUrl,
              author: {
                '@type': 'Person',
                name: 'reed-soul',
                url: 'https://github.com/reed-soul'
              },
              publisher: {
                '@type': 'Organization',
                name: 'reed-soul',
                url: 'https://github.com/reed-soul'
              }
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '首页',
                  item: SITE_ORIGIN
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title,
                  item: canonicalUrl
                }
              ]
            }
          ]
        }
        head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(jsonLd)
        ])
      }
    },

    markdown: {
      config(md) {
        const defaultText = md.renderer.rules.text
        md.renderer.rules.text = (tokens, idx, options, env, self) => {
          const raw = defaultText
            ? defaultText(tokens, idx, options, env, self)
            : tokens[idx].content
          return String(raw).replace(
            /【(官方|行业实践|神话|合规)】/g,
            (_m, kind) => {
              const map: Record<string, string> = {
                官方: 'official',
                行业实践: 'practice',
                神话: 'myth',
                合规: 'compliance'
              }
              const cls = map[kind] || 'official'
              return `<span class="ev-badge ev-badge--${cls}">【${kind}】</span>`
            }
          )
        }
      }
    },

    themeConfig: {
      logo: '/logo.svg',
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
        { text: '大陆创作者', link: '/13-中国大陆创作者专章' },
        { text: '作战卡', link: '/作战卡' },
        { text: 'FAQ', link: '/11-常见问题FAQ' },
        { text: '关于', link: '/关于' },
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
            { text: '12 · 反例与失败模式', link: '/12-反例与失败模式' },
            {
              text: '13 · 中国大陆创作者专章',
              link: '/13-中国大陆创作者专章'
            }
          ]
        },
        {
          text: '附录与工具',
          items: [
            { text: '作战卡（一页打印）', link: '/作战卡' },
            { text: '图示索引（Mermaid）', link: '/图示' },
            { text: '术语表 GLOSSARY', link: '/GLOSSARY' },
            { text: '来源与主张对照 SOURCES', link: '/SOURCES' },
            { text: '关于 / 作者与更新', link: '/关于' }
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
          '内容采用 <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</a>；站点构建代码可采用 MIT。 · <a href="/关于">关于 / 作者与更新</a> · <a href="/llms.txt">llms.txt</a>',
        copyright:
          'Copyright © 2026 reed-soul / 「小白油管起步，一路玩到专家」贡献者 · 无任何涨粉保证 · https://creator.taoliapp.com/'
      },

      editLink: {
        pattern:
          'https://github.com/reed-soul/youtube-starter-bible/edit/main/docs/:path',
        text: '在 GitHub 上编辑此页'
      }
    },

    mermaid: {
      theme: 'neutral',
      themeVariables: {
        primaryColor: '#fde8e8',
        primaryTextColor: '#1a1a1c',
        primaryBorderColor: '#c81e1e',
        lineColor: '#8a8a94',
        secondaryColor: '#f5f3ef',
        tertiaryColor: '#fff7ed',
        background: '#faf9f7',
        mainBkg: '#ffffff',
        nodeBorder: '#c81e1e',
        clusterBkg: '#f5f3ef',
        titleColor: '#1a1a1c',
        edgeLabelBackground: '#faf9f7'
      }
    },
    mermaidPlugin: {
      class: 'mermaid'
    }
  })
)
