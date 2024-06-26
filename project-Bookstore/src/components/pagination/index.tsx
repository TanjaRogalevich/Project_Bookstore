import { useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { buildPaginationScheme } from '../../utils/buildPaginationScheme'

export function Pagination (props: string) {
  const { page } = useParams()
  const pagesCount = useSelector(state => state.books.pagesCount)

  if (!pagesCount) return null

  const paginationScheme = buildPaginationScheme(page, pagesCount)

  return (
    <ul className="pagination">
      {paginationScheme.map((item, index) => {
        if (item === '...') {
          return (
            <li className="page-item" key={index}>
              <span className="page-link">...</span>
            </li>
          )
        }

        return (
          <li className="page-item" key={index}>
            <NavLink className="page-link" to={`/books/search/${props.url}${item}`}>
              {item}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}