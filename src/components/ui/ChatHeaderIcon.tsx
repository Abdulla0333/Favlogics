import archiveIcon from '@/assets/figma/chat/archive.svg'
import menuDotsIcon from '@/assets/figma/chat/menu-dots.svg'
import moonIcon from '@/assets/figma/chat/moon.svg'
import { createAssetIcon } from './createAssetIcon'

const CHAT_HEADER_ICONS = {
  'menu-dots': menuDotsIcon,
  moon: moonIcon,
  archive: archiveIcon,
} as const

export type ChatHeaderIconName = keyof typeof CHAT_HEADER_ICONS

export const ChatHeaderIcon = createAssetIcon(CHAT_HEADER_ICONS, 'chat-header-icon')
