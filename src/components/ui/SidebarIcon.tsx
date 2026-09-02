import chevronIcon from '@/assets/figma/sidebar/chevron.svg'
import instagramIcon from '@/assets/figma/sidebar/instagram.svg'
import peopleIcon from '@/assets/figma/sidebar/people.svg'
import profileIcon from '@/assets/figma/sidebar/profile.svg'
import teamSalesIcon from '@/assets/figma/sidebar/team-sales.svg'
import teamSupportIcon from '@/assets/figma/sidebar/team-support.svg'
import unassignedIcon from '@/assets/figma/sidebar/unassigned.svg'
import userIcon from '@/assets/figma/sidebar/user.svg'
import whatsappIcon from '@/assets/figma/sidebar/whatsapp.svg'
import { createAssetIcon } from './createAssetIcon'

const SIDEBAR_ICONS = {
  profile: profileIcon,
  people: peopleIcon,
  unassigned: unassignedIcon,
  'team-sales': teamSalesIcon,
  'team-support': teamSupportIcon,
  chevron: chevronIcon,
  whatsapp: whatsappIcon,
  instagram: instagramIcon,
  user: userIcon,
} as const

export type SidebarIconName = keyof typeof SIDEBAR_ICONS

export const SidebarIcon = createAssetIcon(SIDEBAR_ICONS, 'sidebar-icon')
