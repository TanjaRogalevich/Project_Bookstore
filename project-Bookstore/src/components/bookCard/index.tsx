import React from 'react'
import { Link } from 'react-router-dom'
import { Book } from '../../type'

interface BookCardProps {
  book: Book;
}

export function BookCard ({ book }: BookCardProps) {
  return (
    <div className="book-card">
      <img src={book.image} alt="" />
      <Link className="nav-link active" aria-current="page" to={`/book/${book.id}`}>
        <h3>{book.title}</h3>
      </Link>
      <p>{book.subtitle}</p>
      <p>{book.price}</p>
    </div>
  )
}
