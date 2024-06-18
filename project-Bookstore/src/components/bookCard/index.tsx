import { Link } from 'react-router-dom'
import { Book } from '../../type'

// interface BookCardProps<T extends Book> {
//   props: T;
// }

export function BookCard (props: Book) {
  return (
    <div className="book-card">
      <img src={props.image} alt="" />
      {/* <Link className="nav-link active" aria-current="page" to={`/book/${props.id}`}> */}
        <h3>{props.title}</h3>
      {/* </Link> */}
      <p>{props.subtitle}</p>
      <p>{props.price}</p>
    </div>
  )
}
