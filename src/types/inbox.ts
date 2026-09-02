export interface SidebarUser {
  id: number
  name: string
  count: number | null
  active?: boolean
}

export interface DummyUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  image: string
  company: {
    name: string
    title: string
    department: string
  }
}

export interface Conversation {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  role: string
  department: string
  company: string
  preview: string
  timestamp: string
  unread: boolean
}

export interface Message {
  id: number
  body: string
  sender: 'user' | 'contact' | 'assistant'
  time: string
}

export type MessageSender = Message['sender']
