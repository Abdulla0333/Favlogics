import inboxIcon from '@/assets/figma/navbar/inbox.svg'
import aiIcon from '@/assets/figma/navbar/ai.svg'
import campaignIcon from '@/assets/figma/navbar/campaign.svg'
import contactsIcon from '@/assets/figma/navbar/contacts.svg'
import settingsIcon from '@/assets/figma/navbar/settings.svg'
import workflowIcon from '@/assets/figma/navbar/workflow.svg'
import { createAssetIcon } from './createAssetIcon'

const NAVBAR_ICONS = {
  inbox: inboxIcon,
  contacts: contactsIcon,
  ai: aiIcon,
  workflow: workflowIcon,
  campaign: campaignIcon,
  settings: settingsIcon,
} as const

export type NavbarIconName = keyof typeof NAVBAR_ICONS

export const NavbarIcon = createAssetIcon(NAVBAR_ICONS, 'navbar-icon')
