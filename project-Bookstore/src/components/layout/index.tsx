import { Outlet } from 'react-router-dom'
import { Header } from '../header/index'
import { Footer } from '../footer/index'
import { Container } from '../container/index'

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
