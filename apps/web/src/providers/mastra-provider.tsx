import { MastraClient } from '@mastra/client-js';
import { createContext, type ReactNode } from 'react';

import { NEXT_PUBLIC_MASTRA_API_CLIENT } from '@/constants/public-environment';

export type MastraClientContextType = MastraClient;

export const MastraClientContext = createContext<MastraClientContextType>({} as MastraClientContextType);

export interface MastraClientProviderProps {
  children: ReactNode;
  baseUrl?: string;
  headers?: Record<string, string>;
}

export const MastraClientProvider = ({ children }: MastraClientProviderProps) => {
  const client = new MastraClient({
    baseUrl: NEXT_PUBLIC_MASTRA_API_CLIENT,
  });

  return <MastraClientContext.Provider value={client}>{children}</MastraClientContext.Provider>;
};
