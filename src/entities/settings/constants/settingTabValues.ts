export const settingsTabValues = {
   info: 'info',
   devices: 'devices',
   subscriptions: 'subscriptions',
   payments: 'payments',
} as const

export type SettingsTabType = (typeof settingsTabValues)[keyof typeof settingsTabValues]
