import {defineUserConfig} from 'vuepress'
import type {DefaultThemeOptions} from 'vuepress'
import {sidebar} from './configs'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'en-US',
    title: 'Software Engineering at Google',
    description: 'Software Engineering at Google',
    base : '/Software-Engineering-at-Google/',

    themeConfig: {
        logo: '/images/hero.png',

        repo: 'suixinio/Software-Engineering-at-Google',

        docsDir: 'docs',

        // theme-level locales config
        locales: {
            /**
             * English locale config
             *
             * As the default locale of @vuepress/theme-default is English,
             * we don't need to set all of the locale fields
             */
            '/': {
                // navbar
                // navbar: navbar.en,

                // sidebar
                sidebar: sidebar.en,

                // page meta
                editLinkText: 'Edit this page on GitHub',
            },

            /**
             * Chinese locale config
             */
            '/zh/': {
                selectLanguageName: '简体中文',
                selectLanguageText: '选择语言',
                selectLanguageAriaLabel: '选择语言',

                // sidebar
                sidebar: sidebar.zh,

                // page meta
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdatedText: '上次更新',
                contributorsText: '贡献者',

                // custom containers
                tip: '提示',
                warning: '注意',
                danger: '警告',

                // 404 page
                notFound: [
                    '这里什么都没有',
                    '我们怎么到这来了？',
                    '这是一个 404 页面',
                    '看起来我们进入了错误的链接',
                ],
                backToHome: '返回首页',

                // a11y
                openInNewWindow: '在新窗口打开',
                toggleDarkMode: '切换夜间模式',
                toggleSidebar: '切换侧边栏',
            },
        },

    },

    locales: {
        '/': {
            lang: 'en-US',
            title: 'VuePress',
            description: 'Vue-powered Static Site Generator',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'VuePress',
            description: 'Vue 驱动的静态网站生成器',
        },
    },
})
