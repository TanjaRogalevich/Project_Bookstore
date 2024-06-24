import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchBooks, removeFromCart } from '../../redux/books-slice'
import { Book } from '../../types/type'
import './index.scss'

export function Cart () {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.books.list.filter(book => book.inCart === true))
  const error = useSelector(state => state.books.error)
  const isLoading = useSelector(state => state.books.isLoading)

  // useEffect(() => {
  //   if (cart.length > 0) return

  //   dispatch(fetchBooks())
  // }, [])

  const cart2 = useSelector(state =>state.books.cart)

  if (isLoading) return <div>Loading...</div>

  if (error) return <div className="alert alert-danger">{error}</div>

  const handleIncrease = () => {
  }

  const handleDecrease = () => {

  }

  const handleRemoveFromCart = (bookId) => {
    dispatch(removeFromCart(bookId))
  }

  return (
    <div className="cart-list">
      {cart2.map((book: Book) => (
        <div key={book.isbn13} className="cart-card">
          <img className="cart-card__image" src={book.image} alt="" />
          <div className="cart-card__content">
            <h3 className="cart-card__title">{book.title}</h3>
            <p className="cart-card__author">{book.subtitle}</p>
            <div className="quantity">
            </div>
          </div>
          <p className="cart-card__price">{book.price}</p>
          <button className="cart-card__remove-button" onClick={handleRemoveFromCart}>Х</button>
        </div>
      ))}
    </div>
  )
}
