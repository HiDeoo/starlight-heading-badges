import type { Page } from '@playwright/test'

import type { TestType } from '../test'

export class TestPage {
  expectedHeadings = [
    { text: 'A heading', id: 'a-heading' },
    { text: 'Default badge', id: 'default-badge' },
    { text: 'A duplicated heading', id: 'a-duplicated-heading' },
    { text: 'A duplicated heading', id: 'a-duplicated-heading-1' },
    { text: 'Variant badge', id: 'variant-badge' },
    { text: 'Non-ToC', id: 'non-toc' },
  ]

  constructor(public readonly page: Page) {}

  goto(type: TestType) {
    return this.page.goto(`/tests/test-${type}/`)
  }
}
