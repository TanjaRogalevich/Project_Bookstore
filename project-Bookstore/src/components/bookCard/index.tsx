import { Link } from 'react-router-dom'
import { Book } from '../../type'

interface BookCardProps<T extends Book> {
  book: T;
}

function BookCard<T extends Book> ({ book }: BookCardProps<T>) {
  return (
    <div className="book-card">
      <img src={book.image} alt="" />
      <Link className="nav-link active" aria-current="page" to={`/book/${book.id}`}>
        <h3>{book.title}</h3>
      </Link>
      <p>{book.subtitle}</p>
      <p>{book.price}</p>
    </div>
  )
}

export default BookCard
