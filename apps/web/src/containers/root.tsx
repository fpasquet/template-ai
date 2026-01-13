import type { ReactNode } from 'react';

import { Toaster } from '@monorepo/ui/components/sonner';
import { CookiesNextProvider } from 'cookies-next';
import { NextIntlClientProvider } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ReactQueryProvider } from '@/providers/react-query-provider';
import messages from '@/translations/fr.json';

export function Root({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="fr" messages={messages}>
      <ReactQueryProvider>
        <CookiesNextProvider pollingOptions={{ enabled: true, intervalMs: 1000 }}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </CookiesNextProvider>
        <Toaster />
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
