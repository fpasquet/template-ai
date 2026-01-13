import { baseConfig } from './base.js';
import globals from 'globals';

/**
 * A custom ESLint configuration for libraries that use Nest.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nestjsConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
