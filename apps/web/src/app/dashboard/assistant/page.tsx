'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@monorepo/ui/components/empty';
import { useTranslations } from 'next-intl';

/**
 * Placeholder page for the assistant navigation entry.
 */
export default function AssistantPage() {
  const t = useTranslations('layout.dashboard.navigation');

  return (
    <Empty className="min-h-[50vh]">
      <EmptyHeader>
        <EmptyTitle>{t(`items.assistant`)}</EmptyTitle>
        <EmptyDescription>{t('placeholder')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
