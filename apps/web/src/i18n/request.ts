import { getRequestConfig } from 'next-intl/server';

/**
 * Supplies the static French locale messages for every request handled by next-intl.
 */
export default getRequestConfig(async () => ({
  locale: 'fr',
  messages: (await import('@/translations/fr.json')).default,
}));
