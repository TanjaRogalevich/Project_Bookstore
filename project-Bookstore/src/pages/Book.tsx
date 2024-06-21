import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBook } from '../redux/book-slice'

export function Book () {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const book = useSelector(state => state.book.data)

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBook(bookId))
    }
  }, [bookId])

  if (!book) return <div>Error</div>

  return (
    <div className="d-flex justify-content-center flex-column ">
      <h2 className="d-flex justify-content-center">{book.title}</h2>
      <div className="w-100 d-flex justify-content-center">
        <img className="p-15 w-50 " src={book.image} alt='' />
      </div>
      <div className="w-100 d-flex justify-content-center flex-column">
        <p className="p-15">{book.subtitle}</p>
      </div>
    </div>
  )
}
