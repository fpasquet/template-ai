import type { UIMessage } from 'ai';

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from '@monorepo/ui/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@monorepo/ui/components/ai-elements/message';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

import WeatherTool from '@/app/components/WeatherTool';

export default function ChatMessages({ messages }: { messages: UIMessage[] }) {
  const t = useTranslations('layout.assistant.thread');

  return (
    <Conversation className="size-full">
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquare className="size-12" />}
            title={t('welcome.primary')}
            description={t('welcome.secondary')}
          />
        ) : (
          <>
            {messages.map(({ role, parts }, index) => (
              <Message from={role} key={index}>
                {role === 'assistant' && <WeatherTool messages={messages} index={index} />}
                <MessageContent>
                  {parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return <MessageResponse key={`${role}-${i}`}>{part.text}</MessageResponse>;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
          </>
        )}
      </ConversationContent>
    </Conversation>
  );
}
