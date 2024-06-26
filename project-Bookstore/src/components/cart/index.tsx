import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBooks, removeFromCart } from '../../redux/books-slice'
import { Book } from '../../types/type'
import './index.scss'

export function Cart () {
  const dispatch = useDispatch()
  const error = useSelector(state => state.books.error)
  const isLoading = useSelector(state => state.books.isLoading)
  const cart = useSelector(state => state.books.cart)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let total = 0
    cart.forEach(book => {
      total += Number(book.price.slice(1))
    })
    setTotalPrice(total)
  }, [cart])

  const handleRemoveFromCart = (bookId) => {
    dispatch(removeFromCart(bookId))
  }

  const handleIncrease = (bookId) => {

  }

  const handleDecrease = (bookId) => {

  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="cart-list">
      {cart.map((book: Book) => (
        <div key={book.isbn13} className="cart-card">
          <img className="cart-card__image" src={book.image} alt="" />
          <div className="cart-card__content">
            <h3 className="cart-card__title">{book.title}</h3>
            <p className="cart-card__author">{book.subtitle}</p>
            <div className="quantity">
              <button onClick={ handleDecrease}>-</button>
              <span>{book.quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          </div>
          <p className="cart-card__price">{book.price}</p>
          <button className="cart-card__remove-button" onClick={() =>handleRemoveFromCart(book.id)}>Удалить</button>
        </div>
      ))}
            <div className="total-price">
        <h4>Total Price: {totalPrice}$</h4>
      </div>
    </div>
  )
}
