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
  const [activeTab, setActiveTab] = useState('description')

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <p>{book.desc}</p>
      case 'authors':
        return <p>{book.authors}</p>
      case 'publisher':
        return <p>{book.publisher}</p>
      default:
        return null
    }
  }

  return (
    <div className="book-detail">
      <h1 className="book-detail__title">{book.title}</h1>
      <div className="book-detail__content">
        <div className="book-detail__content-image">
          <img src={book.image} alt=""/>
        </div>
        <div className="book-detail__content-info">
          <div className="book-detail__content-in">
            <p className="book-detail__content-price">{book.price}</p>
            <p className="book-detail__content-rating">  {'★'.repeat((book.rating))}{'☆'.repeat(5 - (book.rating))}</p>
          </div>
          <p className="book-detail__content-info_author">Authors: {book.authors}</p>
          <p className="book-detail__content-info_publisher">Language: {book.language}</p>
          <p className="book-detail__content-info_release">Year of release: {book.year}</p>
          <button className="add-to-cart" onClick={handleAddToCart} disabled={isButtonDisabled} style={{ backgroundColor: isButtonDisabled ? '#ccc' : '#40bf40' }}>
            {isButtonDisabled ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="book-detail__description">
        <nav className="book-detail__description-nav">
          <button className={activeTab === 'description' ? 'nav-link active px-3' : 'nav-link px-3'} onClick={() => setActiveTab('description')}>
            Book description
          </button>
          <button className={activeTab === 'authors' ? 'nav-link active px-3' : 'nav-link px-3'} onClick={() => setActiveTab('authors')}>
            Authors
          </button>
          <button className={activeTab === 'publisher' ? 'nav-link active px-3' : 'nav-link px-3'} onClick={() => setActiveTab('publisher')}>
            Publisher
          </button>
        </nav>
        <div className="book-detail__description-tab">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
