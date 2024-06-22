import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchBooks } from '../../redux/books-slice'
import { Book } from '../../types/type'
import { BookCard } from '../../components/bookCard'

export function Favorite () {
  const dispatch = useDispatch()
  const books = useSelector(state => state.books.list.filter(book => book.favorite === true))
  const error = useSelector(state => state.books.error)
  const isLoading = useSelector(state => state.books.isLoading)

  useEffect(() => {
    if (books.length > 0) return

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
