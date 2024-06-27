import { Link } from 'react-router-dom'
import { Book } from '../../types/type'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { addFavorite, removeFromFavorites } from '../../redux/books-slice'
import './index.scss'

interface BookCardProps {
  book: Book
}

export function BookCard ({ book }: BookCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.books.favorites)

  const favoriteBook = favorites.find((favBook) => favBook.id === book.id)

  const handleClickFavorite = () => {
    if (favoriteBook) {
      dispatch(removeFromFavorites(book.id))
    } else {
      dispatch(addFavorite(book.id))
    }
  }

  return (
    <div className="book-card">
      <div className="book-card__image" >
        <img src={book.image} alt={book.title} />
      </div>
      <Link className="nav-link active" aria-current="page" to={`/book/${book.id}`}>
        <h3 className="book-card__title">{book.title}</h3>
      </Link>
      <p className="book-card__subtitle">{book.subtitle}</p>
      <div className="book-card__footer">
        <p className="book-card__footer-price">{book.price}</p>
        <button className="book-card__footer-button" onClick={handleClickFavorite}>
          {favoriteBook ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </div>
  )
}
