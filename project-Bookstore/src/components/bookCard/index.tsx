import { Link } from 'react-router-dom'
import { Book } from '../../types/type'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addFavorite } from '../../redux/books-slice'
import './index.scss'

interface BookCardProps {
  book: Book
}

export function BookCard ({ book }: BookCardProps) {
  const dispatch = useDispatch()

  const handleClickFavorite = (event) => {
    dispatch(addFavorite(book.id))
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
        <button onClick={handleClickFavorite}>
          {book.isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </div>
  )
}
