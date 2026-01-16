import type { UIMessage } from 'ai';

import { Message, MessageContent, MessageResponse } from '@monorepo/ui/components/ai-elements/message';

export default function ChatMessages({ messages }: { messages: UIMessage[] }) {
  return (
    <>
      {messages.map(({ role, parts }, index) => (
        <Message from={role} key={index}>
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
  );
}
