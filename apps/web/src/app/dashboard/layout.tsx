'use client';

import type { ReactNode } from 'react';

import { useTranslations } from 'next-intl';

import { NAVIGATION_SECTIONS, USER_MENU_SECTIONS } from '@/constants/navigation';
import { DASHBOARD_PATH } from '@/constants/paths';
import { DashboardLayout as Layout } from '@/layouts/dashboard-layout';

export interface DashboardPageProps {
  /** Primary page content displayed within the dashboard shell. */
  children: ReactNode;
}

/**
 * Reusable shell that wires the translated sidebar and breadcrumb header to the dashboard layout.
 */
export default function DashboardLayout({ children }: DashboardPageProps) {
  const t = useTranslations('layout.dashboard.navigation');

  return (
    <Layout
      sidebar={{
        isLoading: false,
        appBrand: {
          name: t('app-name'),
        },
        navigationSections: NAVIGATION_SECTIONS.map((section) => ({
          id: section.id,
          label: section.labelKey ? t(section.labelKey) : undefined,
          items: section.items.map((item) => ({
            id: item.id,
            href: item.href,
            icon: item.icon,
            label: t(item.translationKey),
            subItems: item.subItems?.map((subItem) => ({
              id: subItem.id,
              href: subItem.href,
              label: t(subItem.translationKey),
              isActive: subItem.isActive,
              onSelect: subItem.onSelect,
            })),
            onSelect: item.onSelect,
          })),
        })),
        user: {
          name: 'Jane Doe',
          email: 'jane.doe@acme.com',
          avatarFallback: 'JD',
          avatar: null,
        },
        userMenuSections: USER_MENU_SECTIONS.map((section) => ({
          id: section.id,
          label: section.labelKey ? t(section.labelKey) : undefined,
          withSeparator: section.withSeparator,
          items: section.items.map((item) => ({
            id: item.id,
            label: t(item.translationKey),
            icon: item.icon,
            onSelect: () => {},
            href: item.href,
          })),
        })),
        userLoadingLabel: 'Loading user…',
      }}
      header={{
        breadcrumbs: [{ id: 'application', label: t('app-name'), href: DASHBOARD_PATH }],
        isLoading: false,
      }}
      isLoading={false}
    >
      {children}
    </Layout>
  );
}
