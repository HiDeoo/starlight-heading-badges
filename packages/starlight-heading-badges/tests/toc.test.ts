import { expect, test } from './test'

test('uses generated IDs', async ({ demoPage }) => {
  await demoPage.goto()

  for (const [headingText, expectedId] of Object.entries(demoPage.expectedHeadingIds)) {
    // Skip level 4 headings not included in the table of contents.
    if (headingText === 'Alta utque') {
      continue
    }

    expect(
      await demoPage.page.locator('starlight-toc').getByRole('link', { name: headingText }).getAttribute('href'),
    ).toBe(`#${expectedId}`)
  }
})

test('adds a badge with the default variant', async ({ demoPage }) => {
  await demoPage.goto()

  const badge = demoPage.page.locator('starlight-toc').getByRole('link', { name: 'Erat feram' }).locator('.sl-badge')

  await expect(badge).toBeVisible()
  await expect(badge).toHaveText('New')
  expect(await badge.getAttribute('class')).toContain('default')
})

test('adds a badge with a specified variant', async ({ demoPage }) => {
  await demoPage.goto()

  const badge = demoPage.page.locator('starlight-toc').getByRole('link', { name: 'Nos at arva' }).locator('.sl-badge')

  await expect(badge).toBeVisible()
  await expect(badge).toHaveText('v1.0')
  expect(await badge.getAttribute('class')).toContain('caution')
})
