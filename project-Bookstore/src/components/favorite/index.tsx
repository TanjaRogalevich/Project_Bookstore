import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchBooks, removeFromFavorites } from '../../redux/books-slice'
import { Book } from '../../types/type'
import { BookCard } from '../../components/bookCard'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'

export function Favorite () {
  const dispatch = useDispatch()
  // const books = useSelector(state => state.books.list.filter(book => book.isFavorite === true))
  const books = useSelector(state => state.books.favorites)
  const error = useSelector(state => state.books.error)
  const isLoading = useSelector(state => state.books.isLoading)

  const getFavouritesFromStorage = localStorage.getItem('favorites')
  const favouritesBooks = JSON.parse(getFavouritesFromStorage)

  // useEffect(() => {
  //   if (books.length > 0) return

  //   dispatch(fetchBooks())
  // }, [])

  if (isLoading) return <div>Loading...</div>

  if (error) return <div className="alert alert-danger">{error}</div>

  const handleRemoveFromFavorites = (bookId) => {
    dispatch(removeFromFavorites(bookId))
  }

  return (
    <div className="cart-list">
      { favouritesBooks.map((book: Book) => (
        <div key={book.isbn13} className="cart-card">
          <img className="cart-card__image" src={book.image} alt="" />
          <div className="cart-card__content">
            <h3 className="cart-card__title">{book.title}</h3>
            <p className="cart-card__author">{book.subtitle}</p>
            <div className="quantity">
            </div>
          </div>
          <p className="cart-card__price">{book.price}</p>
          <p className="book-rating">  {'★'.repeat((book.rating))}{'☆'.repeat(5 - (book.rating))}</p>
          <button className="cart-card__remove-button" onClick={() => handleRemoveFromFavorites(book.id)}>
          {book.isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        </div>
      ))}
    </div>
  )
}
