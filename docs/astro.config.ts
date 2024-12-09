import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import remarkCustomHeadingId from 'remark-custom-heading-id'
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
        {
          label: 'Resources',
          items: [{ label: 'Plugins and Tools', link: '/resources/starlight/' }],
        },
        { label: 'Demo', link: '/demo/' },
      ],
      social: {
        blueSky: 'https://bsky.app/profile/hideoo.dev',
        github: 'https://github.com/HiDeoo/starlight-heading-badges',
      },
      title: 'Starlight Heading Badges',
    }),
  ],
  markdown: {
    remarkPlugins: [remarkCustomHeadingId],
  },
  site: 'https://starlight-heading-badges.vercel.app',
})
