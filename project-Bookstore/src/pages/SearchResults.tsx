import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '../redux/books-slice'
import { BookCard } from '../components/bookCard'
import { Book } from '../types/type'

export function SearchResults () {
  const dispatch = useDispatch()
  const { query } = useParams()
  const books = useSelector((state) => state.books.list)
  const error = useSelector((state) => state.books.error)
  const isLoading = useSelector((state) => state.books.isLoading)

  useEffect(() => {
    dispatch(fetchSearch(query))
  }, [query])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map((book: Book) => <BookCard key={book.isbn13} book={book} />)
  }

  return (
    <div>
      <h1>Search results for «{query}»</h1>
      {renderBooks()}
    </div>
  )
}
