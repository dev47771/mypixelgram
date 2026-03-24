export const SETTINGS_TAB_VALUES = {
   info: 'info',
   devices: 'devices',
   subscriptions: 'subscriptions',
   payments: 'payments',
} as const

export type SettingsTabType = (typeof SETTINGS_TAB_VALUES)[keyof typeof SETTINGS_TAB_VALUES]
