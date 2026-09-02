import { API_LIMITS, API_USER_SELECT } from '../../constants'
import type { Conversation, DummyUser, Message, SidebarUser } from '../../types'
import { delay, formatMessageTime } from '../../utils'
import { dummyJsonClient, jsonPlaceholderClient } from './client'
import {
  mapPostToMessage,
  mapUserToConversation,
  mapUserToDetails,
  mapUsersToSidebarUsers,
  truncatePostPreview,
} from './mappers'
import { dummyJsonRoutes, jsonPlaceholderRoutes } from './routes'
import type {
  DummyJsonUser,
  DummyJsonUsersResponse,
  JsonPlaceholderPost,
} from './types'

export async function fetchConversations(): Promise<Conversation[]> {
  const [usersData, postsData] = await Promise.all([
    dummyJsonClient.get<DummyJsonUsersResponse>(
      dummyJsonRoutes.users({
        limit: API_LIMITS.users,
        select: API_USER_SELECT.conversation,
      }),
    ),
    jsonPlaceholderClient.get<JsonPlaceholderPost[]>(
      jsonPlaceholderRoutes.posts({ limit: API_LIMITS.postsPreview }),
    ),
  ])

  const latestPostByUser = new Map<number, JsonPlaceholderPost>()
  for (const post of postsData) {
    if (!latestPostByUser.has(post.userId)) {
      latestPostByUser.set(post.userId, post)
    }
  }

  return usersData.users.map((user, index) => {
    const post = latestPostByUser.get(user.id)
    const preview = post ? truncatePostPreview(post.body) : undefined
    return mapUserToConversation(user, index, preview)
  })
}

export async function fetchMessagesForUser(userId: number): Promise<Message[]> {
  const posts = await jsonPlaceholderClient.get<JsonPlaceholderPost[]>(
    jsonPlaceholderRoutes.posts({ userId, limit: API_LIMITS.messages }),
  )

  return posts.map(mapPostToMessage)
}

export async function fetchSidebarUsers(): Promise<SidebarUser[]> {
  const data = await dummyJsonClient.get<DummyJsonUsersResponse>(
    dummyJsonRoutes.users({
      limit: API_LIMITS.users,
      select: API_USER_SELECT.sidebar,
    }),
  )

  return mapUsersToSidebarUsers(data.users)
}

export async function fetchUserById(userId: number): Promise<DummyUser> {
  const user = await dummyJsonClient.get<DummyJsonUser>(
    dummyJsonRoutes.userById(userId),
  )

  return mapUserToDetails(user)
}

export async function sendMessage(userId: number, body: string): Promise<Message> {
  await jsonPlaceholderClient.post<JsonPlaceholderPost>(
    jsonPlaceholderRoutes.createPost(),
    {
      userId,
      title: body.slice(0, 60),
      body,
    },
  )

  return {
    id: Date.now(),
    body,
    sender: 'user',
    time: formatMessageTime(),
  }
}

export async function waitForBootstrap(ms: number): Promise<void> {
  await delay(ms)
}
