import hideoo from '@hideoo/eslint-config'

export default hideoo({
  files: ['**/starlight-toc.ts'],
  rules: {
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/related-getter-setter-pairs': 'off',
  },
})
