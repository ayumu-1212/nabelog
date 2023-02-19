module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'import'],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/comma-dangle': 0,
    'space-before-function-paren': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/no-unused-vars': 'off', // or "no-unused-vars"
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'import/order': [
      'error',
      {
        // グループごとの並び順
        groups: [
          'builtin', // 1. fsや path などの node "builtin" のモジュール
          'external', // 2. npm install したパッケージ
          'internal', // 3. webpack などでパス設定したモジュール
          ['parent', 'sibling'], // 4. 親階層と小階層のファイル
          'object', // object"-imports
          'type', // 型だけをインポートする type imports
          'index', // 同階層のファイル
        ],
        // グループごとに改行を入れる
        'newlines-between': 'always', // "never" を指定すると改行なし
        // FIXME: ちょっとよく分かってない
        // This defines import types that are not handled by configured pathGroups. This is mostly needed when you want to handle path groups that look like external imports.
        pathGroupsExcludedImportTypes: ['builtin'],
        // アルファベット順・大文字小文字を区別しない
        alphabetize: { order: 'asc', caseInsensitive: true },
        // パターンマッチしたものをグループにする
        // "newlines-between": "always" の場合は pathGroups  ごとに空行が入る
        pathGroups: [
          // react 関連を external より前にする
          // "pathGroupsExcludedImportTypes": ["react"], にしてみたが `react`, `react-dom` などが別グループになってしまったので pattern で無理やり同じグループにした
          {
            pattern: 'react**',
            group: 'external',
            position: 'before',
          },
          // `@/entity` の import をグルーピング
          {
            pattern: '@/entity/**',
            group: 'internal',
            position: 'before',
          },
          // `@/pages` の import をグルーピング
          {
            pattern: '@/pages/**',
            group: 'internal',
            position: 'before',
          },
          // `@/components` の import をグルーピング
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
          // CSS module を一番最後に
          {
            pattern: './**.module.css',
            group: 'index',
            position: 'after',
          },
        ],
      },
    ],
  },
}
