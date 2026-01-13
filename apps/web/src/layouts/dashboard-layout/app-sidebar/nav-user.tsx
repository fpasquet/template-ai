'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@monorepo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@monorepo/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@monorepo/ui/components/sidebar';
import { Skeleton } from '@monorepo/ui/components/skeleton';
import { type LucideIcon, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

export interface SidebarUserMenuItem {
  /** Unique identifier for the menu item. */
  id: string;
  /** Text displayed in the menu item. */
  label: string;
  /** Optional icon displayed before the label. */
  icon?: LucideIcon;
  /** Optional destination link for the menu item. */
  href?: string;
  /** Optional keyboard shortcut hint. */
  shortcut?: string;
  /** Triggered when the menu item is selected. */
  onSelect?: () => void | Promise<void>;
}

export interface SidebarUserMenuSection {
  /** Unique identifier for the section. */
  id: string;
  /** Optional label shown above the section. */
  label?: string;
  /** Items contained in the section. */
  items: SidebarUserMenuItem[];
  /** Displays a separator after the section when true. */
  withSeparator?: boolean;
}

export interface SidebarUser {
  /** Display name for the user. */
  name: string;
  /** User email shown below the name. */
  email: string;
  /** Fallback initials shown when the avatar is missing. */
  avatarFallback: string;
  /** Avatar image URL. */
  avatar?: string | null;
}

export interface NavUserProps {
  /** User information displayed in the trigger. */
  user: SidebarUser;
  /** Structured menu configuration. */
  menuSections: SidebarUserMenuSection[];
  /** Text used for the trigger when loading state is active. */
  loadingLabel: string;
  /** Enables skeleton placeholders when content is loading. */
  isLoading?: boolean;
}

/**
 * Stateless user menu rendered in the sidebar footer.
 */
export function NavUser({ user, menuSections, loadingLabel, isLoading }: NavUserProps) {
  const { isMobile } = useSidebar();

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
              <Skeleton className="h-4 w-24" aria-label={loadingLabel} />
              <Skeleton className="h-3 w-20" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="rounded-lg">{user.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            {menuSections.map((section) => (
              <DropdownMenuGroup key={section.id}>
                {section.label ? (
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="px-1 py-1.5 text-left text-sm">{section.label}</div>
                  </DropdownMenuLabel>
                ) : null}
                {section.items.map((item) =>
                  item.href ? (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link href={item.href}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={item.id} onSelect={item.onSelect}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                      {item.shortcut ? (
                        <span className="ml-auto text-xs tracking-widest text-muted-foreground">{item.shortcut}</span>
                      ) : null}
                    </DropdownMenuItem>
                  )
                )}
                {section.withSeparator ? <DropdownMenuSeparator /> : null}
              </DropdownMenuGroup>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
