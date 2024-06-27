import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { fetchSearch } from '../../redux/books-slice'
import { BookCard } from '../../components/bookCard'
import { Book } from '../../types/interface'
import { Pagination } from '../../components/pagination'
import { RootState } from '../../redux/store'
import './index.scss'

export function Search () {
  const dispatch = useAppDispatch()
  const { query, page: selectedPage } = useParams()
  const books = useAppSelector((state: RootState) => state.books.list)
  const error = useAppSelector((state: RootState) => state.books.error)
  const isLoading = useAppSelector((state: RootState) => state.books.isLoading)

  useEffect(() => {
    dispatch(fetchSearch({ query, page: selectedPage || 1 }))
  }, [query, selectedPage])

  function renderBooks () {
    if (isLoading) return <div>Loading...</div>

    if (error) return <div className="alert alert-danger">{error}</div>

    return books.map((book: Book) => <BookCard key={book.isbn13} book={book} />)
  }

  return (
  <>
    <div className="wrapper-search">
      <h1 className="wrapper-search__title">Search results for «{query}»</h1>
      <div className="wrapper-search__results">
        {renderBooks()}
      </div>
      <Pagination url={`${query}/page/`}/>
    </div>
  </>
  )
}
