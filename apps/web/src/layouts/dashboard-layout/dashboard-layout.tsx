'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@monorepo/ui/components/breadcrumb';
import { Separator } from '@monorepo/ui/components/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@monorepo/ui/components/sidebar';
import { Skeleton } from '@monorepo/ui/components/skeleton';
import { type ReactNode, Fragment } from 'react';

import { AppSidebar, type AppSidebarProps } from './app-sidebar';

export interface DashboardBreadcrumbItem {
  /** Unique identifier for the breadcrumb segment. */
  id: string;
  /** Label displayed for the breadcrumb. */
  label: string;
  /** Optional navigation target. */
  href?: string;
  /** Marks the segment as the current page. */
  isCurrent?: boolean;
}

export interface DashboardHeaderProps {
  /** Breadcrumb segments rendered inside the header. */
  breadcrumbs: DashboardBreadcrumbItem[];
  /** Optional header level actions aligned to the right. */
  actions?: ReactNode;
  /** Enables header-level skeleton placeholders. */
  isLoading?: boolean;
}

export interface DashboardLayoutProps {
  /** Configuration for the sidebar component. */
  sidebar?: AppSidebarProps;
  /** Header configuration including breadcrumbs and actions. */
  header?: DashboardHeaderProps;
  /** Primary page content rendered below the header. */
  children: ReactNode;
  /** Enables global skeleton placeholders for header, sidebar, and content. */
  isLoading?: boolean;
  /** Optional custom skeleton rendered in place of the content. */
  contentSkeleton?: ReactNode;
}

/**
 * Generic, stateless dashboard layout combining sidebar, header, and content area.
 */
export function DashboardLayout({ sidebar, header, children, isLoading, contentSkeleton }: DashboardLayoutProps) {
  const headerIsLoading = isLoading || header?.isLoading;
  const sidebarProps: AppSidebarProps | undefined = sidebar
    ? { ...sidebar, isLoading: sidebar.isLoading ?? isLoading }
    : undefined;

  return (
    <SidebarProvider>
      {sidebarProps ? <AppSidebar {...sidebarProps} /> : null}
      <SidebarInset>
        {header ? (
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center gap-2 px-4">
              {sidebarProps ? (
                <>
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                </>
              ) : null}
              {headerIsLoading ? (
                <div className="flex w-full items-center gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <Breadcrumb>
                    <BreadcrumbList>
                      {header.breadcrumbs.map((breadcrumb, index) => {
                        const isLast = index === header.breadcrumbs.length - 1;

                        return (
                          <Fragment key={breadcrumb.id}>
                            <BreadcrumbItem className={breadcrumb.isCurrent ? 'font-medium' : undefined}>
                              {breadcrumb.href && !isLast ? (
                                <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                              ) : (
                                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                              )}
                            </BreadcrumbItem>
                            {!isLast ? <BreadcrumbSeparator /> : null}
                          </Fragment>
                        );
                      })}
                    </BreadcrumbList>
                  </Breadcrumb>
                  {header.actions}
                </div>
              )}
            </div>
          </header>
        ) : null}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {isLoading
            ? (contentSkeleton ?? (
                <>
                  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Skeleton className="aspect-video rounded-xl" />
                    <Skeleton className="aspect-video rounded-xl" />
                    <Skeleton className="aspect-video rounded-xl" />
                  </div>
                  <Skeleton className="min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </>
              ))
            : children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
