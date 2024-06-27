import React from 'react'

export interface Book {
  title: string
  subtitle: string
  authors: string
  id: string
  price: string
  image: string
  url: string
  isbn13: string
  isFavorite: boolean
  cart: boolean
  quantity: number
  inCart: boolean
  language: string
  year: string
  desc: string
  rating: number
  publisher: string
}

export interface BookCardProps {
  book: Book
}

export interface ContainerProps {
  children: React.ReactNode;
}

export interface PaginationProps {
  url: string
}

export interface TitleProps {
  children: React.ReactNode;
}
