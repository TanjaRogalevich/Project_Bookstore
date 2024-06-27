import { useAppSelector } from '../../types/hooks'
import { useParams, NavLink } from 'react-router-dom'
import { buildPaginationScheme } from '../../utils/buildPaginationScheme'
import { RootState } from '../../redux/store'

interface PaginationProps {
  url: string
}

export function Pagination (props: PaginationProps) {
  const { page } = useParams()
  const pagesCount = useAppSelector((state: RootState) => state.books.pagesCount)

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