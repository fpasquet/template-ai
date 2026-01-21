import type { StorageThreadType } from '@mastra/core/memory';

import { useQuery } from '@tanstack/react-query';

import { useMastraClient } from '@/app/hooks/use-mastra-client';
import { NEXT_PUBLIC_DEFAULT_AGENT_ID } from '@/constants/public-environment';

interface UseThreadsOptions {
  resourceId: string;
  isMemoryEnabled: boolean;
}

export const useThreads = ({ resourceId, isMemoryEnabled }: UseThreadsOptions) => {
  const client = useMastraClient();

  return useQuery<null | StorageThreadType[]>({
    queryKey: ['memory', 'threads', resourceId],
    queryFn: async () => {
      if (!isMemoryEnabled) return null;
      const listMemoryThreadsResponse = await client.listMemoryThreads({
        resourceId,
        agentId: NEXT_PUBLIC_DEFAULT_AGENT_ID,
      });
      return listMemoryThreadsResponse.threads;
    },
    enabled: Boolean(isMemoryEnabled),
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
