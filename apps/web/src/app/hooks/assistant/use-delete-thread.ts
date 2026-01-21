import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMastraClient } from '@/app/hooks/use-mastra-client';
import { NEXT_PUBLIC_DEFAULT_AGENT_ID } from '@/constants/public-environment';

export const useDeleteThread = () => {
  const client = useMastraClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ threadId }: { threadId: string }) => {
      const thread = client.getMemoryThread({ threadId, agentId: NEXT_PUBLIC_DEFAULT_AGENT_ID });
      return thread.delete();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['memory', 'threads'],
      });
      console.log('Chat deleted successfully');
    },
    onError: () => {
      console.error('Failed to delete chat');
    },
  });
};
