import './App.scss'
import { BookCard } from './components/bookCard'
import { BookList } from './components/bookList'
import { Layout } from './components/layout'

export function App () {
  return (
    <>
      <Layout>
        <BookList />
      </Layout>
    </>
  )
}
