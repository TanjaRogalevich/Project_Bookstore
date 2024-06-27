import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { useEffect, useState } from 'react'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/books-slice'
import { Book } from '../../types/type'
import { RootState } from '../../redux/store'
import './index.scss'

export function Cart () {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state: RootState) => state.books.cart)
  const error = useAppSelector((state: RootState) => state.books.error)
  const isLoading = useAppSelector((state: RootState) => state.books.isLoading)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const total = cart.reduce((accumulator, book) => accumulator + Number(book.price.slice(1)) * book.quantity, 0)
    setTotalPrice(total)
  }, [cart])

  const handleRemoveFromCart = (bookId: string) => {
    dispatch(removeFromCart(bookId))
  }

  const handleIncrease = (bookId: string) => {
    dispatch(increaseQuantity(bookId))
  }

  const handleDecrease = (bookId: string) => {
    dispatch(decreaseQuantity(bookId))
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div className="alert alert-danger">{error}</div>

  if (cart.length === 0) {
    return (
      <div className="cart-list">
        <div className="empty-cart">Cart is empty....</div>
      </div>
    )
  }

  return (
    <div className="cart-list">
      {cart.map((book: Book) => (
        <div key={book.isbn13} className="cart-card">
          <img className="cart-card__image" src={book.image} alt="" />
          <div className="cart-card__content">
            <h3 className="cart-card__title">{book.title}</h3>
            <p className="cart-card__author">{book.subtitle}</p>
            <div className="cart-card__quantity">
              <button onClick={() => handleDecrease(book.id)}>-</button>
              <span className="cart-card__quantity-number">{book.quantity}</span>
              <button className="cart-card__quantity-button" onClick={() => handleIncrease(book.id)}>+</button>
            </div>
          </div>
          <p className="cart-card__price">{book.price}</p>
          <button className="cart-card__remove-button" onClick={() => handleRemoveFromCart(book.id)}>Удалить</button>
        </div>
      ))}
      <div className="total-price">
        <h4>Total price: {totalPrice}$</h4>
      </div>
    </div>
  )
}
