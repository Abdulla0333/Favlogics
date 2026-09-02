import chevronDownIcon from '@/assets/figma/conversations/chevron-down.svg'
import composeIcon from '@/assets/figma/conversations/compose.svg'
import filterIcon from '@/assets/figma/conversations/filter.svg'
import menuIcon from '@/assets/figma/conversations/menu.svg'
import searchIcon from '@/assets/figma/conversations/search.svg'
import { createAssetIcon } from './createAssetIcon'

const CONVERSATION_ICONS = {
  menu: menuIcon,
  compose: composeIcon,
  search: searchIcon,
  filter: filterIcon,
  'chevron-down': chevronDownIcon,
} as const

export type ConversationIconName = keyof typeof CONVERSATION_ICONS

export const ConversationIcon = createAssetIcon(
  CONVERSATION_ICONS,
  'conversation-icon',
)
