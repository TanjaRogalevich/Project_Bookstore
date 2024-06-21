import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { BookCard } from '../bookCard'
import './index.scss'
import { fetchBooks } from '../../redux/books-slice'
import { Book } from '../../types/type'

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

    return books.map((book: Book) => <BookCard key={book.isbn13} book={book} />)
  }
  console.log(books)

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
      <div className="wrapper-book">
          {renderBooks()}
        {/* <PostPreviewModal /> */}
      </div>
    </>
  )
}
