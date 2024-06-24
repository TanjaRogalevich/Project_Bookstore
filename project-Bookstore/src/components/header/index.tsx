import { NavLink } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiBookmark } from 'react-icons/fi'
import { SearchForm } from '../searchForm'
import './index.scss'

export function Header () {
  const navLinkClass = ({ isActive }) => isActive ? 'nav-link active px-3' : 'nav-link px-3'

  return (
    <header className="header">
      <div className="logo">
        <NavLink className={navLinkClass} to="/"><h1>BOOKSTORE</h1></NavLink>
      </div>
      <SearchForm></SearchForm>
      <div className="icons">
        <NavLink className={navLinkClass} to="/books/addToCart"><FiShoppingCart className="icon" /></NavLink>
        {/* <NavLink className={navLinkClass} to="/books/favorite"><FiHeart className="icon" /></NavLink> */}
        <NavLink className={navLinkClass} to="/books/favorite"><FiBookmark className="icon" /></NavLink>
      </div>
    </header>
  )
}
