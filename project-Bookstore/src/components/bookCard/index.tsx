import { Link } from 'react-router-dom'
import { Book } from '../../types/type'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite } from '../../redux/books-slice'
import './index.scss'
import { useEffect } from 'react'

interface BookCardProps {
  book: Book
}

export function BookCard ({ book }: BookCardProps) {
  const dispatch = useDispatch()
  const books = useSelector(state=>state.books.list)

  const handleClickFavorite = () => {
    dispatch(addFavorite(book.id))
  }

  // function check () {
  //   if (books.length > 0) {
  //     const bookInFavorites = books.find(item => item.id === book.id)
  //     if (bookInFavorites && book.isFavorite) {
  //       // book.isFavorite = true
  //       return <FaBookmark />
  //     } else {
  //       return <FaRegBookmark />
  //     }
  //   } else {
  //     return <FaRegBookmark />
  //   }
  // }

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
          {/* {check()} */}
          {book.isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </div>
  )
}
