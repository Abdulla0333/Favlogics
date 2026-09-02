import { env } from '../config/env'

export const API_LIMITS = {
  users: env.usersLimit,
  messages: env.messagesLimit,
  postsPreview: env.postsPreviewLimit,
} as const

export const API_USER_SELECT = {
  sidebar: 'firstName,lastName,id',
  conversation:
    'firstName,lastName,id,email,phone,image,company,username',
} as const

export const API_DEFAULTS = {
  customerRole: 'Customer',
  generalDepartment: 'General',
  unknownCompany: 'Unknown',
} as const
