import { TestTypes, expect, test } from './test'

for (const testType of TestTypes) {
  test(`uses generated IDs (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    for (const [index, { text, id }] of testPage.expectedHeadings.entries()) {
      // Skip level 4 headings not included in the table of contents.
      if (text === 'Non-ToC') {
        continue
      }

      const tocItem = testPage.page
        .locator('starlight-toc')
        .getByRole('link')
        // Skip the "Overview" link.
        .nth(index + 1)

      expect(await tocItem.textContent()).toMatch(text)
      expect(await tocItem.getAttribute('href')).toBe(`#${id}`)
    }
  })

  test(`adds a badge with the default variant (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const badge = testPage.page
      .locator('starlight-toc')
      .getByRole('link', { name: 'Default badge' })
      .locator('.sl-badge')

    await expect(badge).toBeVisible()
    await expect(badge).toHaveText('New')
    expect(await badge.getAttribute('class')).toContain('default')
  })

  test(`adds a badge with a specified variant (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const badge = testPage.page
      .locator('starlight-toc')
      .getByRole('link', { name: 'Variant badge' })
      .locator('.sl-badge')

    await expect(badge).toBeVisible()
    await expect(badge).toHaveText('v1.0')
    expect(await badge.getAttribute('class')).toContain('caution')
  })
}
