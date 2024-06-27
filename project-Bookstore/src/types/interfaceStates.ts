import { Book } from './interface'

export interface BooksState {
  list: Book[]
  cart: Book[]
  favorites: Book[]
  isLoading: boolean
  error: string | null | undefined
  pagesCount: number | null
}

export interface Fetch {
  query: string | undefined
  page: string | number
}

export interface BookState {
  data: Book
  isLoading: boolean
  error: string | null | undefined
}
