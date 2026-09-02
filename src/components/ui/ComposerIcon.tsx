import composerDocumentIcon from '@/assets/figma/composer/document.svg'
import composerEmojiIcon from '@/assets/figma/composer/emoji.svg'
import composerImageIcon from '@/assets/figma/composer/image.svg'
import composerLightningIcon from '@/assets/figma/composer/lightning.svg'
import composerMicrophoneIcon from '@/assets/figma/composer/microphone.svg'
import composerUndoIcon from '@/assets/figma/composer/undo.svg'
import composerVideoIcon from '@/assets/figma/composer/video.svg'
import { createAssetIcon } from './createAssetIcon'

const COMPOSER_ICONS = {
  image: composerImageIcon,
  video: composerVideoIcon,
  document: composerDocumentIcon,
  emoji: composerEmojiIcon,
  undo: composerUndoIcon,
  lightning: composerLightningIcon,
  microphone: composerMicrophoneIcon,
} as const

export type ComposerIconName = keyof typeof COMPOSER_ICONS

export const ComposerIcon = createAssetIcon(COMPOSER_ICONS, 'chat-composer-icon')
