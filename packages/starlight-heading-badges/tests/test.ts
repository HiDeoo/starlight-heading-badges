import { test as base } from '@playwright/test'

import { DemoPage } from './fixtures/DemoPage'

export { expect } from '@playwright/test'

export const test = base.extend<Fixtures>({
  demoPage: async ({ page }, use) => {
    const demoPage = new DemoPage(page)

    await use(demoPage)
  },
})

interface Fixtures {
  demoPage: DemoPage
}
