import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useEffect } from 'react'
import { BookCard } from '../bookCard'
import { fetchBooks } from '../../redux/books-slice'
import { Book } from '../../types/type'
import { RootState } from '../../redux/store'
import './index.scss'

export function Books () {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state: RootState) => state.books.list)
  const error = useAppSelector((state: RootState) => state.books.error)
  const isLoading = useAppSelector((state: RootState) => state.books.isLoading)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map((book: Book) => <BookCard key={book.isbn13} book={book} />)
  }

  return (
    <div className="wrapper-book">
      {renderBooks()}
    </div>
  )
}
