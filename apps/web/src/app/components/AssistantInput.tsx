import type { ChatRequestOptions, CreateUIMessage } from 'ai';

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@monorepo/ui/components/ai-elements/prompt-input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function AssistantInput({
  sendMessage,
}: {
  sendMessage: (message: CreateUIMessage | string, options?: ChatRequestOptions) => void;
}) {
  const t = useTranslations('layout.assistant.thread.composer');

  const [text, setText] = useState<string>('');

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage({
      text: message.text || 'Sent with attachments',
      files: message.files,
    });
    setText('');
  };

  return (
    <PromptInput onSubmit={handleSubmit} globalDrop multiple>
      <PromptInputHeader>
        <PromptInputAttachments>{(attachment) => <PromptInputAttachment data={attachment} />}</PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea onChange={(e) => setText(e.target.value)} value={text} placeholder={t('placeholder')} />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  );
}
