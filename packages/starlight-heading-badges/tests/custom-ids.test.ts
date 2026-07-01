import { TestTypes, expect, test } from './test'

// https://github.com/bruits/satteri/issues/134
// https://github.com/bruits/satteri/issues/135
test.fixme(
  process.env['STARLIGHT_HEADING_BADGES_TEST_MARKDOWN_PROCESSOR'] === 'satteri',
  'Sätteri currently has a few issues when enabling both the directive and the heading attributes features.',
)

for (const testType of TestTypes) {
  test.describe('headings', () => {
    test(`uses specified custom IDs (${testType})`, async ({ testPage }) => {
      await testPage.goto(testType, 'custom-ids')

      for (const [index, { text, id }] of testPage.expectedCustomHeadings.entries()) {
        const heading = testPage.page
          .locator('.sl-markdown-content')
          .getByRole('heading')
          // Skip non-custom headings.
          .nth(index)

        await heading.highlight()

        expect(await heading.textContent()).toMatch(text)
        expect(await heading.getAttribute('id')).toBe(id)
      }
    })

    test(`adds a heading badge to a heading with a custom ID (${testType})`, async ({ testPage }) => {
      await testPage.goto(testType, 'custom-ids')

      const headingBadge = testPage.page
        .getByRole('heading', { name: 'Heading with custom ID and a badge' })
        .locator('span[data-shb-badge-variant=default]')

      await expect(headingBadge).toBeVisible()
      await expect(headingBadge).toHaveText('Custom')
    })
  })

  test.describe('ToC', () => {
    test(`uses specified custom IDs (${testType})`, async ({ testPage }) => {
      await testPage.goto(testType, 'custom-ids')

      for (const [index, { text, id }] of testPage.expectedCustomHeadings.entries()) {
        const tocItem = testPage.page
          .locator('starlight-toc')
          .getByRole('link')
          // Skip the "Overview" link.
          .nth(index + 1)

        expect(await tocItem.textContent()).toMatch(text)
        expect(await tocItem.getAttribute('href')).toBe(`#${id}`)
      }
    })

    test(`adds a badge to a heading with a custom ID (${testType})`, async ({ testPage }) => {
      await testPage.goto(testType, 'custom-ids')

      const badge = testPage.page
        .locator('starlight-toc')
        .getByRole('link', { name: 'Heading with custom ID and a badge' })
        .locator('.sl-badge')

      await expect(badge).toBeVisible()
      await expect(badge).toHaveText('Custom')
    })
  })
}
