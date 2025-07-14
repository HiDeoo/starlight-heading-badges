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
    { text: 'Badge with a space', id: 'badge-with-a-space' },
    { text: 'Badge with multiple spaces', id: 'badge-with-multiple-spaces' },
    { text: 'Multiple badges', id: 'multiple-badges' },
  ]

  expectedCustomHeadings = [
    { text: 'Heading with custom ID', id: 'custom1' },
    { text: 'Heading with custom ID and a badge', id: 'custom2' },
  ]

  constructor(public readonly page: Page) {}

  goto(type: TestType) {
    return this.page.goto(`/tests/test-${type}/`)
  }
}
