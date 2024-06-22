import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { BooksPage } from './pages/Books'
import { FavoritePage } from './pages/Favorites'
import { BookPage } from './pages/Book'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <BooksPage/>
      },
      {
        path: '/book/:bookId',
        element: <BookPage/>
      },
      {
        path: '/books/favorite',
        element: <FavoritePage />
      }
    ]
  }
])
