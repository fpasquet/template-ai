'use client';

import type { ComponentProps, ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@monorepo/ui/components/sidebar';
import { Skeleton } from '@monorepo/ui/components/skeleton';

import { NavMain, type SidebarNavSection } from './nav-main';
import { NavUser, type NavUserProps, type SidebarUser } from './nav-user';

/**
 * Application brand information rendered in the sidebar header.
 */
export interface AppBrand {
  /** Application name displayed in the sidebar header. */
  name: string;
  /** Optional logo shown before the application name. */
  logo?: ReactNode;
}

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  /** Grouped navigation configuration rendered in the sidebar. */
  navigationSections: SidebarNavSection[];
  /** User information displayed in the footer. */
  user: SidebarUser;
  /** Structured menu configuration for the user dropdown. */
  userMenuSections: NavUserProps['menuSections'];
  /** Label displayed within the user skeleton placeholder. */
  userLoadingLabel: string;
  /** Brand displayed at the top of the sidebar. */
  appBrand: AppBrand;
  /** Enables skeleton placeholders throughout the sidebar. */
  isLoading?: boolean;
}

/**
 * Stateless application sidebar composed of configurable sections.
 */
export function AppSidebar({
  navigationSections,
  user,
  userMenuSections,
  userLoadingLabel,
  appBrand,
  isLoading,
  ...props
}: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-center">
        <div
          className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold leading-6 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          data-state={state}
        >
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-24 group-data-[collapsible=icon]:hidden" />
            </>
          ) : (
            <>
              {appBrand.logo}
              <span className="group-data-[collapsible=icon]:hidden">{appBrand.name}</span>
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain sections={navigationSections} isLoading={isLoading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} menuSections={userMenuSections} loadingLabel={userLoadingLabel} isLoading={isLoading} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
