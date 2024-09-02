import { TestTypes, expect, test } from './test'

for (const testType of TestTypes) {
  test(`generates IDs for all headings (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    for (const [index, { text, id }] of testPage.expectedHeadings.entries()) {
      const heading = testPage.page.locator('.sl-markdown-content').getByRole('heading').nth(index)

      expect(await heading.textContent()).toMatch(text)
      expect(await heading.getAttribute('id')).toBe(id)
    }
  })

  test(`adds a heading badge with the default variant (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const headingBadge = testPage.page
      .getByRole('heading', { name: 'Default badge' })
      .locator('span[data-shb-badge-variant=default]')

    await expect(headingBadge).toBeVisible()
    await expect(headingBadge).toHaveText('New')
  })

  test(`adds a heading badge with a specified variant (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const headingBadge = testPage.page
      .getByRole('heading', { name: 'Variant Badge' })
      .locator('span[data-shb-badge-variant=caution]')

    await expect(headingBadge).toBeVisible()
    await expect(headingBadge).toHaveText('v1.0')
  })

  test(`adds a heading badge to non-ToC headings (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const headingBadge = testPage.page
      .getByRole('heading', { name: 'Non-ToC' })
      .locator('span[data-shb-badge-variant=success]')

    await expect(headingBadge).toBeVisible()
    await expect(headingBadge).toHaveText('POST')
  })

  test(`adds a heading badge with spaces (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const headingBadge = testPage.page
      .getByRole('heading', { name: 'Badge with spaces' })
      .locator('span[data-shb-badge-variant=default]')

    await expect(headingBadge).toBeVisible()
    await expect(headingBadge).toHaveText('A Badge')
  })
}
