import type { LogLevel } from '@mastra/loggers';

/**
 * The log level to use for logging. The possible values are 'fatal', 'error',
 * 'warn', 'info', 'debug', 'trace', and 'silent'.
 */
export const LOG_LEVEL = (process.env.LOG_LEVEL as LogLevel) ?? 'info';

/**
 * Models Open Router
 */
export const DEFAULT_MODEL = 'openrouter/mistralai/devstral-2512:free' as const;
