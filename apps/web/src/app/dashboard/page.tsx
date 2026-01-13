'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@monorepo/ui/components/empty';
import { useTranslations } from 'next-intl';

/**
 * Homepage renders the dashboard shell with the home navigation item selected.
 */
export default function Page() {
  const t = useTranslations('layout.dashboard.navigation');

  return (
    <Empty className="min-h-[50vh]">
      <EmptyHeader>
        <EmptyTitle>{t(`items.home`)}</EmptyTitle>
        <EmptyDescription>{t('placeholder')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
