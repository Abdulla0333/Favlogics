import hexAi from '../assets/hex/hex-ai.svg'
import hexCampaign from '../assets/hex/hex-campaign.svg'
import hexContacts from '../assets/hex/hex-contacts.svg'
import hexInbox from '../assets/hex/hex-inbox.svg'
import hexMedia from '../assets/hex/hex-media.svg'
import hexWorkflow from '../assets/hex/hex-workflow.svg'
import type { HoneycombItem } from '../types'

export const HEX_OUTLINE_PATH =
  'M34.126 4.16113C37.7608 2.06256 42.2392 2.06256 45.874 4.16113L68.1006 16.9932C71.7354 19.0917 73.9746 22.9708 73.9746 27.168V52.832C73.9746 57.0292 71.7354 60.9083 68.1006 63.0068L45.874 75.8389C42.2392 77.9374 37.7608 77.9374 34.126 75.8389L11.8994 63.0068C8.26458 60.9083 6.02539 57.0292 6.02539 52.832V27.168C6.02539 22.9708 8.26458 19.0917 11.8994 16.9932L34.126 4.16113Z'

export const HONEYCOMB_ITEMS: HoneycombItem[] = [
  { id: 'ai', left: 156, top: 39, size: 90, src: hexAi, delay: 0 },
  { id: 'inbox', left: 37, top: 199, size: 80, src: hexInbox, delay: 0.35 },
  { id: 'workflow', left: 914, top: 144, size: 90, src: hexWorkflow, delay: 0.7 },
  { id: 'campaign', left: 1109, top: 289, size: 60, src: hexCampaign, delay: 1.05 },
  { id: 'contacts', left: 1131, top: 39.5, size: 80, src: hexContacts, delay: 1.4 },
  { id: 'media', left: 201, top: 271.5, size: 80, src: hexMedia, delay: 1.75 },
]
