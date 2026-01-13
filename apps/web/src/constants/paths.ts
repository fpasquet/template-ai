export const DASHBOARD_PATH = '/dashboard' as const;

export const DASHBOARD_PATHS = {
  HOME: `${DASHBOARD_PATH}`,
  ASSISTANT: `${DASHBOARD_PATH}/assistant`,
  ACCOUNT: `${DASHBOARD_PATH}/account`,
} as const;
