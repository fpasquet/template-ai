'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@monorepo/ui/components/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@monorepo/ui/components/sidebar';
import { Skeleton } from '@monorepo/ui/components/skeleton';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import type { NavigationItemId } from '@/constants/navigation';

export interface SidebarNavSubItem {
  /** Unique identifier for the navigation sub item. */
  id: string;
  /** Display label for the sub item. */
  label: string;
  /** Target URL for the sub item. */
  href?: string;
  /** Invoked when the sub item is selected. */
  onSelect?: () => void | Promise<void>;
  /** Indicates whether the sub item matches the active route. */
  isActive?: boolean;
}

export interface SidebarNavItem {
  /** Unique identifier for the navigation item. */
  id: NavigationItemId;
  /** Display label for the item. */
  label: string;
  /** Target URL for the item. */
  href?: string;
  /** Invoked when the item is selected. */
  onSelect?: () => void | Promise<void>;
  /** Optional icon to render next to the item label. */
  icon?: LucideIcon;
  /** Indicates whether the item or one of its sub items matches the active route. */
  isActive?: boolean;
  /** Nested links displayed within the collapsible section. */
  subItems?: SidebarNavSubItem[];
}

/**
 * Navigation section grouping a label with its items.
 */
export interface SidebarNavSection {
  /** Unique identifier for the navigation section. */
  id: string;
  /** Optional label displayed above the section. */
  label?: string;
  /** Collection of navigation items displayed within the section. */
  items: SidebarNavItem[];
}

export interface NavMainProps {
  /** Navigation sections each with a label and items. */
  sections: SidebarNavSection[];
  /** Enables skeleton placeholders when content is loading. */
  isLoading?: boolean;
}

/**
 * Stateless navigation list rendered inside the sidebar.
 */
export function NavMain({ sections, isLoading }: NavMainProps) {
  const resolvedSections =
    sections.length > 0 ? sections : [{ id: 'placeholder', label: undefined, items: [] satisfies SidebarNavItem[] }];

  return (
    <>
      {resolvedSections.map((section) => {
        const skeletonItemsCount = section.items.length > 0 ? section.items.length : 3;
        const itemsToRender = isLoading
          ? Array.from({ length: skeletonItemsCount }, (_, itemIndex) => itemIndex)
          : section.items;

        const showLabel = isLoading || Boolean(section.label);

        return (
          <SidebarGroup key={section.id}>
            {showLabel ? (
              <SidebarGroupLabel>{isLoading ? <Skeleton className="h-4 w-24" /> : section.label}</SidebarGroupLabel>
            ) : null}
            <SidebarMenu>
              {itemsToRender.map((item, itemIndex) => {
                if (isLoading) {
                  return (
                    <SidebarMenuItem key={`loading-${section.id}-${itemIndex}`}>
                      <SidebarMenuButton>
                        <Skeleton className="h-4 w-full" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                const typedItem = item as SidebarNavItem;
                const hasSubItems = Boolean(typedItem.subItems?.length);

                if (!hasSubItems) {
                  const isLink = Boolean(typedItem.href);
                  const href = typedItem.href;
                  const menuButtonProps = typedItem.onSelect ? { onClick: typedItem.onSelect } : undefined;

                  return (
                    <SidebarMenuItem key={typedItem.id}>
                      {isLink ? (
                        <SidebarMenuButton asChild tooltip={typedItem.label} isActive={typedItem.isActive}>
                          <Link href={href ?? '#'}>
                            {typedItem.icon && <typedItem.icon />}
                            <span>{typedItem.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton tooltip={typedItem.label} isActive={typedItem.isActive} {...menuButtonProps}>
                          {typedItem.icon && <typedItem.icon />}
                          <span>{typedItem.label}</span>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                }

                return (
                  <Collapsible
                    key={typedItem.id}
                    asChild
                    defaultOpen={typedItem.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={typedItem.label} onClick={typedItem.onSelect}>
                          {typedItem.icon && <typedItem.icon />}
                          <span>{typedItem.label}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {typedItem.subItems?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.id}>
                              {subItem.href ? (
                                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                  <Link href={subItem.href}>
                                    <span>{subItem.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              ) : (
                                <SidebarMenuSubButton isActive={subItem.isActive} onClick={subItem.onSelect}>
                                  <span>{subItem.label}</span>
                                </SidebarMenuSubButton>
                              )}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
}
