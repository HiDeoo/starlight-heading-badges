import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightHeadingBadges from 'starlight-heading-badges'

export default defineConfig({
  integrations: [
    starlight({
      credits: true,
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-heading-badges/edit/main/docs/',
      },
      plugins: [starlightHeadingBadges()],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Getting Started', link: '/getting-started/' },
            { label: 'Usage', link: '/usage/' },
          ],
        },
        { label: 'Demo', link: '/demo/' },
      ],
      social: {
        github: 'https://github.com/HiDeoo/starlight-heading-badges',
      },
      title: 'Starlight Heading Badges',
    }),
  ],
  site: 'https://starlight-heading-badges.vercel.app',
})
