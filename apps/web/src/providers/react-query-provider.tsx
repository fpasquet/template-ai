'use client';

import type { PropsWithChildren, ReactElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * Supplies a singleton {@link QueryClient} instance to client components within the app router tree.
 */
export function ReactQueryProvider({ children }: PropsWithChildren): ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  );
}
