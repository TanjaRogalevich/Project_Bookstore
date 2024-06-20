// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Book } from '../../type'
// import { BookCard } from '../bookCard/index'

// export function BookList () {
//   return (
//     <div className="book-list">
//       {books.map((book, index) => (
//         <BookCard key={index} price={book.price} id={book.id}/>
//       ))}
//     </div>
//   )
// }

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { BookCard } from '../bookCard'
// import './index.scss'
import { fetchBooks } from '../../redux/books-slice'

export function Books () {
  const dispatch = useDispatch()
  const books = useSelector(state => state.books.list)
  const error = useSelector(state => state.books.error)
  const isLoading = useSelector(state => state.books.isLoading)

  useEffect(() => {
    // if (books.length > 0) return

    dispatch(fetchBooks())
  }, [])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map(book => <BookCard key={book.isbn13} id={book.isbn13} title={book.title} subtitle={book.subtitle} image={book.image} price={book.price}/>)
  }

  return (
    <>
      {/* <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/posts/allPosts">All posts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts/favorite">Favorites</Link>
        </li>
      </ul> */}
      <div className="wrapper-post">
        <div className="item-lg">
          {renderBooks()}
        </div>
        {/* <PostPreviewModal /> */}
      </div>
    </>
  )
}
