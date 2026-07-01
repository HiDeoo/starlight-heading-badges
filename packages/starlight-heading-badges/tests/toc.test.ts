import { TestTypes, expect, test } from './test'

for (const testType of TestTypes) {
  test(`uses generated IDs (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    // Skip the "Overview" link.
    let tocItemOffset = 1

    for (const [index, { text, id }] of testPage.expectedHeadings.entries()) {
      // Skip level 4 headings not included in the table of contents.
      if (text === 'Non-ToC') {
        tocItemOffset = 0
        continue
      }

      const tocItem = testPage.page
        .locator('starlight-toc')
        .getByRole('link')
        .nth(index + tocItemOffset)

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

  test(`adds a badge with a space (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const badge = testPage.page
      .locator('starlight-toc')
      .getByRole('link', { name: 'Badge with a space' })
      .locator('.sl-badge')

    await expect(badge).toBeVisible()
    await expect(badge).toHaveText('A Badge')
  })

  test(`adds a badge with multiple spaces (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const badge = testPage.page
      .locator('starlight-toc')
      .getByRole('link', { name: 'Badge with multiple spaces' })
      .locator('.sl-badge')

    await expect(badge).toBeVisible()
    await expect(badge).toHaveText('A Badge with Spaces')
  })

  test(`adds multiple badge (${testType})`, async ({ testPage }) => {
    await testPage.goto(testType)

    const badges = testPage.page
      .locator('starlight-toc')
      .getByRole('link', { name: 'Multiple badges' })
      .locator('.sl-badge')

    for (let i = 0; i < 2; i++) {
      await expect(badges.nth(i)).toBeVisible()
      await expect(badges.nth(i)).toHaveText(`Badge ${i + 1}`)
    }
  })
}
