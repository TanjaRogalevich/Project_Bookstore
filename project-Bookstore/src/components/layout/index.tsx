import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/index'
import BookList from '../main/index'
import Footer from '../footer/index'
import Container from '../container/index'
import { BookCard } from '../bookCard'

export function Layout () {
  return (
    <>
      <Header />
      <Container>
      <Outlet />
      </Container>
      <Footer />
    </>
  )
}
