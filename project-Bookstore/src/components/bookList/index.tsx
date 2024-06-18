import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Book } from '../../type'
import { BookCard } from '../bookCard/index'

const books = [
  { id: 1, title: ' One', author: 'Tanja', price: 29.99 },
  { id: 2, title: ' Two', author: 'Auvfd', price: 19.99 }
]

export function BookList () {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard key={index} price={book.price} id={book.id}/>
      ))}
    </div>
  )
}
