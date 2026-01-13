import { Bot, CircleUser, Home, LogOut } from 'lucide-react';

import type {
  SidebarNavItem,
  SidebarNavSection,
  SidebarNavSubItem,
} from '@/layouts/dashboard-layout/app-sidebar/nav-main';
import type { SidebarUserMenuItem, SidebarUserMenuSection } from '@/layouts/dashboard-layout/app-sidebar/nav-user';

import { DASHBOARD_PATHS } from '@/constants/paths';

/**
 * Identifiers for each sidebar navigation item.
 */
export type NavigationItemId = 'home' | 'assistant';

/**
 * Translation key for a sidebar navigation item label.
 */
export type NavigationItemTranslationKey = `items.${NavigationItemId}`;

/**
 * Definition of a sidebar navigation item without localization applied.
 */
export interface NavigationSubItemDefinition extends Omit<SidebarNavSubItem, 'label' | 'isActive'> {
  /** Translation key used to resolve the navigation label. */
  translationKey: NavigationItemTranslationKey;
  /** Indicates whether the sub item matches the active route. */
  isActive?: boolean;
}

export interface NavigationItemDefinition extends Omit<SidebarNavItem, 'label' | 'subItems' | 'isActive'> {
  /** Translation key used to resolve the navigation label. */
  translationKey: NavigationItemTranslationKey;
  /** Nested navigation entries. */
  subItems?: NavigationSubItemDefinition[];
  /** Indicates whether the item or one of its sub items matches the active route. */
  isActive?: boolean;
}

export interface NavigationSectionDefinition extends Omit<SidebarNavSection, 'items'> {
  /** Translation key used to resolve the section label when required. */
  labelKey?: string;
  /** Collection of navigation items contained in the section. */
  items: NavigationItemDefinition[];
}

/**
 * Untranslated navigation items grouped for the sidebar configuration.
 */
export const NAVIGATION_SECTIONS: NavigationSectionDefinition[] = [
  {
    id: 'primary-navigation',
    items: [
      { id: 'home', href: DASHBOARD_PATHS.HOME, icon: Home, translationKey: 'items.home' },
      { id: 'assistant', href: DASHBOARD_PATHS.ASSISTANT, icon: Bot, translationKey: 'items.assistant' },
    ],
  },
];

/**
 * Identifiers for each item displayed in the user sidebar menu.
 */
export type UserMenuItemId = 'account' | 'logout';

/**
 * Translation key for a user menu item label.
 */
export type UserMenuItemTranslationKey = `user-menu.${UserMenuItemId}`;

/**
 * Definition of a user menu item without localization applied.
 */
export interface UserMenuItemDefinition extends Omit<SidebarUserMenuItem, 'label'> {
  /** Translation key used to resolve the menu label. */
  translationKey: UserMenuItemTranslationKey;
}

export interface UserMenuSectionDefinition extends Omit<SidebarUserMenuSection, 'items'> {
  /** Translation key used to resolve the section label when required. */
  labelKey?: string;
  /** Items belonging to the section. */
  items: UserMenuItemDefinition[];
}

/**
 * Untranslated user menu configuration grouped by sections.
 */
export const USER_MENU_SECTIONS: UserMenuSectionDefinition[] = [
  {
    id: 'account',
    items: [{ id: 'account', translationKey: 'user-menu.account', icon: CircleUser, href: DASHBOARD_PATHS.ACCOUNT }],
    withSeparator: true,
  },
  {
    id: 'session',
    items: [{ id: 'logout', translationKey: 'user-menu.logout', icon: LogOut }],
  },
];
