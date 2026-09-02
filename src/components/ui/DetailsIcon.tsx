import addLabelIcon from '@/assets/figma/details/add-label.svg'
import assigneeIcon from '@/assets/figma/details/assignee.svg'
import chevronIcon from '@/assets/figma/details/chevron.svg'
import instagramIcon from '@/assets/figma/details/instagram.svg'
import minimizePanelIcon from '@/assets/figma/details/minimize-panel.svg'
import tagIcon from '@/assets/figma/details/tag.svg'
import teamIcon from '@/assets/figma/details/team.svg'
import { createAssetIcon } from './createAssetIcon'

const DETAILS_ICONS = {
  'minimize-panel': minimizePanelIcon,
  chevron: chevronIcon,
  assignee: assigneeIcon,
  team: teamIcon,
  tag: tagIcon,
  'add-label': addLabelIcon,
  instagram: instagramIcon,
} as const

export type DetailsIconName = keyof typeof DETAILS_ICONS

export const DetailsIcon = createAssetIcon(DETAILS_ICONS, 'details-icon')
