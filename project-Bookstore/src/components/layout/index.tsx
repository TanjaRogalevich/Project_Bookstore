import React from 'react'
import Header from '../header/index'
import BookList from '../main/index'
import Footer from '../footer/index'
import Container from '../container/index'

const books = [
  { id: 1, title: ' One', author: 'Tanja', price: 29.99 },
  { id: 2, title: ' Two', author: 'Auvfd', price: 19.99 }
]

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <BookList books={books} />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
