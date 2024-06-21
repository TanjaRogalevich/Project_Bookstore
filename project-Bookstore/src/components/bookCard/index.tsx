import { Link } from 'react-router-dom'
import { Book } from '../../types/type'
import './index.scss'

interface BookCardProps {
  book: Book
}

export function BookCard ({ book }: BookCardProps) {
  return (
    <div className="book-card">
      <div className="book-card__image" >
        <img src={book.image} alt={book.title} />
      </div>
        <Link className="nav-link active" aria-current="page" to={`/book/${book.isbn13}`}>
          <h3 className="book-card__title">{book.title}</h3>
        </Link>
        <p className="book-card__subtitle">{book.subtitle}</p>
      <p className="book-card__price">{book.price}</p>
    </div>
  )
}
