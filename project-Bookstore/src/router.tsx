import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { BooksPage } from './pages/Books'
import { Book } from './pages/Book'

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
        element: <Book />
      }
    ]
  }
])
