import {
  ACTIVE_USER_FALLBACK,
  API_DEFAULTS,
  CONVERSATION_TIMESTAMPS,
  MESSAGE_TIMES,
  PREVIEW_TRUNCATE_MAX,
  SIDEBAR_USER_COUNTS,
} from '../../constants'
import type { Conversation, DummyUser, Message, SidebarUser } from '../../types'
import { formatFullName, normalizeWhitespace, truncateText } from '../../utils'
import type { DummyJsonUser, JsonPlaceholderPost } from './types'

export function mapUserToConversation(
  user: DummyJsonUser,
  index: number,
  preview?: string,
): Conversation {
  return {
    id: user.id,
    name: formatFullName(user.firstName, user.lastName),
    email: user.email,
    phone: user.phone,
    avatar: user.image,
    role: user.company?.title ?? API_DEFAULTS.customerRole,
    department: user.company?.department ?? API_DEFAULTS.generalDepartment,
    company: user.company?.name ?? API_DEFAULTS.unknownCompany,
    preview:
      preview ??
      truncateText(
        `${user.company?.title ?? 'Contact'} at ${user.company?.name ?? 'company'}`,
        PREVIEW_TRUNCATE_MAX,
      ),
    timestamp: CONVERSATION_TIMESTAMPS[index] ?? 'today',
    unread: index === 0,
  }
}

export function mapUserToDetails(user: DummyJsonUser): DummyUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    username: user.username,
    image: user.image,
    company: {
      name: user.company?.name ?? '',
      title: user.company?.title ?? '',
      department: user.company?.department ?? '',
    },
  }
}

export function mapPostToMessage(post: JsonPlaceholderPost, index: number): Message {
  return {
    id: post.id,
    body: normalizeWhitespace(post.body),
    sender: index % 2 === 0 ? 'contact' : 'assistant',
    time: MESSAGE_TIMES[index % MESSAGE_TIMES.length] ?? '12:00',
  }
}

export function mapUsersToSidebarUsers(
  users: Pick<DummyJsonUser, 'id' | 'firstName' | 'lastName'>[],
): SidebarUser[] {
  const michaelIndex = users.findIndex(
    (user) =>
      user.firstName === ACTIVE_USER_FALLBACK.firstName &&
      user.lastName === ACTIVE_USER_FALLBACK.lastName,
  )
  const activeIndex =
    michaelIndex >= 0 ? michaelIndex : ACTIVE_USER_FALLBACK.fallbackIndex

  return users.map((user, index) => ({
    id: user.id,
    name: formatFullName(user.firstName, user.lastName),
    count: SIDEBAR_USER_COUNTS[index] ?? null,
    active: index === activeIndex,
  }))
}

export function truncatePostPreview(body: string): string {
  return truncateText(body, PREVIEW_TRUNCATE_MAX)
}
