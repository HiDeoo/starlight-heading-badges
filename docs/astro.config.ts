import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import remarkCustomHeadingId from 'remark-custom-heading-id'
import starlightHeadingBadges from 'starlight-heading-badges'

const site =
  process.env['VERCEL_ENV'] !== 'production' && process.env['VERCEL_URL']
    ? `https://${process.env['VERCEL_URL']}`
    : 'https://starlight-heading-badges.vercel.app/'

export default defineConfig({
  integrations: [
    starlight({
      credits: true,
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-heading-badges/edit/main/docs/',
      },
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: new URL('og.jpg', site).href },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'Starlight plugin to add badges to your Markdown and MDX headings.',
          },
        },
      ],
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
      social: [
        {
          href: 'https://bsky.app/profile/hideoo.dev',
          icon: 'blueSky',
          label: 'Bluesky',
        },
        {
          href: 'https://github.com/HiDeoo/starlight-heading-badges',
          icon: 'github',
          label: 'GitHub',
        },
      ],
      title: 'Starlight Heading Badges',
    }),
  ],
  markdown: {
    remarkPlugins: [remarkCustomHeadingId],
  },
  site,
})
