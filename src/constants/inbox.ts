export const SIDEBAR_USER_COUNTS: Array<number | null> = [
  2, 11, null, 4, 5, null, 1, null, 2,
]

export const CONVERSATION_TIMESTAMPS = [
  '23:23',
  '23:16',
  '22:28',
  '20:43',
  '17:37',
  '16:01',
  '13:44',
  '09:02',
  'Yesterday',
] as const

export const MESSAGE_TIMES = [
  '09:02',
  '09:15',
  '09:28',
  '09:41',
  '09:55',
  '10:08',
  '10:22',
  '10:35',
  '10:48',
  '11:00',
] as const

export const ACTIVE_USER_FALLBACK = {
  firstName: 'Michael',
  lastName: 'Johnson',
  fallbackIndex: 1,
} as const

export const PREVIEW_TRUNCATE_MAX = 48
