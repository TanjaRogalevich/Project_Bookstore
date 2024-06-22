import { NavLink } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiBookmark } from 'react-icons/fi'
import './index.scss'

export function Header () {
  const navLinkClass = ({ isActive }) => isActive ? 'nav-link active px-3' : 'nav-link px-3'

  return (
    <header className="header">
      <div className="logo">
        <h1>BOOKSTORE</h1>
      </div>
      <form className="search-form">
        <input type="text" placeholder="Search..." className="search-form__input" />
        <button type="submit" className="search-form__button">Search</button>
      </form>
      <div className="icons">
        <NavLink className={navLinkClass} to="/books/favorite"><FiShoppingCart className="icon" /></NavLink>
        <NavLink className={navLinkClass} to="/books/favorite"><FiHeart className="icon" /></NavLink>
        <NavLink className={navLinkClass} to="/books/favorite"><FiBookmark className="icon" /></NavLink>
      </div>
    </header>
  )
}
