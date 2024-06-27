import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { fetchBook } from '../../redux/book-slice'
import { addToCart } from '../../redux/books-slice'
import { RootState } from '../../redux/store'
import './index.scss'

export function Book () {
  const { bookId } = useParams()
  const dispatch = useAppDispatch()
  const book = useAppSelector((state: RootState) => state.book.data)

  const [isButtonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBook(bookId))
    }
  }, [bookId])

  if (!book) return <div>Error</div>

  const handleAddToCart = () => {
    dispatch(addToCart(bookId))
    setButtonDisabled(true)
  }

  return (
    <div className="book-detail">
      <h1 className="book-title">{book.title}</h1>
      <div className="book-content">
        <div className="book-image">
          <img src={book.image} alt=""/>
        </div>
        <div className="book-info">
          <div className="book-in">
            <p className="book-price">{book.price}</p>
            <p className="book-rating">  {'★'.repeat((book.rating))}{'☆'.repeat(5 - (book.rating))}</p>
          </div>
          <p className="book-author">Authors: {book.authors}</p>
          <p className="book-publisher">Language: {book.language}</p>
          <p className="book-release">Year of release: {book.year}</p>
          <button className="add-to-cart" onClick={handleAddToCart} disabled={isButtonDisabled} style={{ backgroundColor: isButtonDisabled ? '#ccc' : '#40bf40' }}>
            {isButtonDisabled ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="book-description">
        <h2>Book description</h2>
        <p>{book.desc}</p>
      </div>
    </div>
  )
}
