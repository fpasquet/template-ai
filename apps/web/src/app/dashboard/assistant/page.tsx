'use client';

import { useChat } from '@ai-sdk/react';
import { Empty } from '@monorepo/ui/components/empty';
import { DefaultChatTransport } from 'ai';

import AssistantInput from '@/app/components/AssistantInput';
import ChatMessages from '@/app/components/ChatMessages';
import WeatherTool from '@/app/components/WeatherTool';

/**
 * Placeholder page for the assistant navigation entry.
 */
export default function Page() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: 'http://localhost:4111/chat',
    }),
  });

  return (
    <Empty className="min-h-[50vh]">
      <WeatherTool messages={messages} />

      <ChatMessages messages={messages} />

      <AssistantInput sendMessage={sendMessage} />
    </Empty>
  );
}
