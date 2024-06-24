import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchBooks } from '../../redux/books-slice'
import { Book } from '../../types/type'
import { BookCard } from '../../components/bookCard'

export function Favorite () {
  const dispatch = useDispatch()
  // const books = useSelector(state => state.books.list.filter(book => book.isFavorite === true))
  const error = useSelector(state => state.books.error)
  const isLoading = useSelector(state => state.books.isLoading)

  // const getFavouritesFromStorage = localStorage.getItem('favorites')
  // const favouritesBooks = JSON.parse(getFavouritesFromStorage)

  // useEffect(() => {
  //   if (books.length > 0) return

  //   dispatch(fetchBooks())
  // }, [])

  const books2 = useSelector(state => state.books.favorites)

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books2.map((book: Book) => <BookCard key={book.isbn13} book={book} />)
  }

  return (
    <div className="wrapper-book">
        {renderBooks()}
    </div>
  )
}
