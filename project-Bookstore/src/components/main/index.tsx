import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      <h2>Book List</h2>
      <ul className="book-list__items">
        {books.map(book => (
          <li key={book.id} className="book-list__item">
            <div className="book-list__item-title">{book.title}</div>
            <div className="book-list__item-author">{book.author}</div>
            <div className="book-list__item-price">${book.price}</div>
            <button className="book-list__item-button">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
