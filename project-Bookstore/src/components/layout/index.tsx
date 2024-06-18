import React from 'react'
import Header from '../header/index'
import BookList from '../main/index'
import Footer from '../footer/index'
import Container from '../container/index'
import { BookCard } from '../bookCard'



export function Layout (props) {
  return (
    <>
      <Header />
      <Container>
        {props.children}
      </Container>
      <Footer />
    </>
  )
}
