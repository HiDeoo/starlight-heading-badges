import type { Page } from '@playwright/test'

export class DemoPage {
  expectedHeadingIds = {
    'Tuetur lege': 'tuetur-lege',
    'Erat feram': 'erat-feram',
    'Renovat myricae': 'renovat-myricae',
    'Post senserit': 'post-senserit',
    'Non esse': 'non-esse',
    'Nos at arva': 'nos-at-arva',
    'Sortes populisque': 'sortes-populisque',
    'Alta utque': 'alta-utque',
  }

  constructor(public readonly page: Page) {}

  goto() {
    return this.page.goto(`/demo/`)
  }
}
