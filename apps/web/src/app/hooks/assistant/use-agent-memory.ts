import { useQuery } from '@tanstack/react-query';

import { useMastraClient } from '@/app/hooks/use-mastra-client';
import { NEXT_PUBLIC_DEFAULT_AGENT_ID } from '@/constants/public-environment';

export const useAgentMemory = () => {
  const client = useMastraClient();

  return useQuery({
    queryKey: ['agent-memory'],
    queryFn: () => client.getMemoryStatus(NEXT_PUBLIC_DEFAULT_AGENT_ID),
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 10 * 60 * 1000, // 10 mins
    retry: false,
  });
};
