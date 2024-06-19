import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { BooksPage } from './pages/BooksPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <BooksPage/>
      }
    ]
  }
])
