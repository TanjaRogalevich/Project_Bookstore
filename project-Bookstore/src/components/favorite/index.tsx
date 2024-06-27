import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { removeFromFavorites } from '../../redux/books-slice'
import { Book } from '../../types/type'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { RootState } from '../../redux/store'

export function Favorite () {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state: RootState) => state.books.favorites)
  const error = useAppSelector((state: RootState) => state.books.error)
  const isLoading = useAppSelector((state: RootState) => state.books.isLoading)

  if (isLoading) return <div>Loading...</div>

  if (error) return <div className="alert alert-danger">{error}</div>

  const handleRemoveFromFavorites = (bookId: string) => {
    dispatch(removeFromFavorites(bookId))
  }

  if (books.length === 0) {
    return (
      <div className="cart-list">
        <div className="empty-cart">You don't have favorites yet</div>
      </div>
    )
  }

  return (
    <div className="cart-list">
      { books.map((book: Book) => (
        <div key={book.isbn13} className="cart-card">
          <img className="cart-card__image" src={book.image} alt="" />
          <div className="cart-card__content">
            <h3 className="cart-card__title">{book.title}</h3>
            <p className="cart-card__author">{book.subtitle}</p>
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
