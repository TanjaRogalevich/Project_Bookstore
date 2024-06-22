import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBook } from '../../redux/book-slice'
import './index.scss'

export function Book () {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const book = useSelector(state => state.book.data)

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBook(bookId))
    }
  }, [bookId])

  if (!book) return <div>Error</div>

  return (
    <div className="book-detail">
      <h1 className="book-title">{book.title}</h1>
      <div className="book-content">
      <div className="book-image">
          <img src={book.image} alt=""/>
      </div>
      <div className="book-info">
          <p className="book-price">{book.price}</p>
          <p className="book-author">Authors: {book.authors}</p>
          <p className="book-publisher">Language: {book.language}</p>
          <p className="book-isbn">Year of release: {book.year}</p>
          <button className="add-to-cart">Add to Cart</button>
      </div>
      </div>
      <div className="book-description">
      <h2>Book description</h2>
      <p>{book.desc}</p>
      </div>
    </div>
  )
}
