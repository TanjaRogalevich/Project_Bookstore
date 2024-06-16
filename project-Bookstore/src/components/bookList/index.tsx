import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Book } from '../../type'
import BookCard from '../bookCard/index'

function BookList () {




  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList
