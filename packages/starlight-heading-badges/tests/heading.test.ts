import { expect, test } from './test'

test('generates IDs for all headings', async ({ demoPage }) => {
  await demoPage.goto()

  for (const [headingText, expectedId] of Object.entries(demoPage.expectedHeadingIds)) {
    expect(await demoPage.page.getByRole('heading', { name: headingText }).getAttribute('id')).toBe(expectedId)
  }
})

test('adds a heading badge with the default variant', async ({ demoPage }) => {
  await demoPage.goto()

  const headingBadge = demoPage.page
    .getByRole('heading', { name: 'Erat feram' })
    .locator('span[data-shb-badge-variant=default]')

  await expect(headingBadge).toBeVisible()
  await expect(headingBadge).toHaveText('New')
})

test('adds a heading badge with a specified variant', async ({ demoPage }) => {
  await demoPage.goto()

  const headingBadge = demoPage.page
    .getByRole('heading', { name: 'Alta utque' })
    .locator('span[data-shb-badge-variant=success]')

  await expect(headingBadge).toBeVisible()
  await expect(headingBadge).toHaveText('POST')
})
