import type {SidebarConfig} from '@vuepress/theme-default'

export const zh: SidebarConfig = {
    '/zh/': [
        {
            text: 'Google',
            children: [
                '/zh/Preface.md',
                '/zh/Foreword.md',
                '/zh/Chapter-1_What_Is_Software_Engineering/Chapter-1_What_Is_Software_Engineering.md',
                '/zh/Chapter-2_How_to_Work_Well_on_Teams/Chapter-2_How_to_Work_Well_on_Teams.md',
                '/zh/Chapter-3_Knowledge_Sharing/Chapter-3_Knowledge_Sharing.md',
                '/zh/Chapter-4_Engineering_for_Equity/Chapter-4_Engineering_for_Equity.md'
            ],
        },
    ]
}
