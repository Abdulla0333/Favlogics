export interface DummyJsonCompany {
  name: string
  title: string
  department: string
}

export interface DummyJsonUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  image: string
  company: DummyJsonCompany
}

export interface DummyJsonUsersResponse {
  users: DummyJsonUser[]
}

export interface JsonPlaceholderPost {
  id: number
  userId: number
  title: string
  body: string
}

export interface CreatePostPayload {
  userId: number
  title: string
  body: string
}
