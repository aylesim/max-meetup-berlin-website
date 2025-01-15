import { Author } from './author'

export type Post = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
} 