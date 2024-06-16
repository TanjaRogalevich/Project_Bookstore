import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import './index.scss'

function Header () {
  return (
    <header className="header">
      <div className="logo">
        <h1>BOOKSTORE</h1>
      </div>
      <form className="search-form">
        <input type="text" placeholder="Search..." className="search-form__input" />
        <button type="submit" className="search-form__button">Search</button>
      </form>
      <div className="icon">
        <FiShoppingCart className="icon__cart" />
        <FiHeart className="icon__cart" />
      </div>
    </header>
  )
}

export default Header
