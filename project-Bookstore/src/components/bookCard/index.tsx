import { Link } from 'react-router-dom'
import { Book } from '../../types/type'

// interface BookCardProps {
//   book: Book;
// }

// export function BookCard ({ book } : BookCardProps) {
//   return (
//     <div className="book-card">
//       <img src={book.image} alt="" />
//       <Link className="nav-link active" aria-current="page" to={`/book/${book.id}`}>
//         <h3>{book.title}</h3>
//       </Link>
//       <p>{book.subtitle}</p>
//       <p>{book.price}</p>
//     </div>
//   )
// }

// interface BookCardProps {
//   book: Book;
// }

export function BookCard (props : Book) {
  return (
    <div className="book-card">
      <img src={props.image} alt="" />
      <Link className="nav-link active" aria-current="page" to={`/book/${props.id}`}>
        <h3>{props.title}</h3>
      </Link>
      <p>{props.subtitle}</p>
      <p>{props.price}</p>
    </div>
  )
}
