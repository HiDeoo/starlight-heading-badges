import { test as base } from '@playwright/test'

import { TestPage } from './fixtures/TestPage'

export { expect } from '@playwright/test'

export const TestTypes = ['md', 'mdx'] as const

export const test = base.extend<Fixtures>({
  testPage: async ({ page }, use) => {
    const testPage = new TestPage(page)

    await use(testPage)
  },
})

interface Fixtures {
  testPage: TestPage
}

export type TestType = (typeof TestTypes)[number]
