import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBooks, requestSearch } from '../services/book'
import { Book } from '../types/type'

interface BooksState {
  list: Book[],
  cart:[],
  favorites:[],
  isLoading: boolean,
  error: null | string,
  pagesCount: null
}

const initialState: BooksState = {
  list: [],
  cart: [],
  favorites: [],
  isLoading: false,
  error: null,
  pagesCount: null
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params = {}, { rejectWithValue }) => {
  try {
    return await requestBooks({ params })
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchSearch = createAsyncThunk('search/fetchSearch', async ({ query, page }, { rejectWithValue }) => {
  try {
    return await requestSearch(query, page)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const bookId = action.payload
      const card = state.list.find((book) => book.id === bookId)
      state.favorites.push(card)
      card.isFavorite = !card.isFavorite

      // state.list = state.list.map(book =>
      //   book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
      // )
      // localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    addToCart: (state, action) => {
      const bookId = action.payload
      const card = state.list.find((book) => book.id === bookId)
      state.cart.push(card)

      // state.list = state.list.map(book =>
      //   book.id === bookId ? { ...book, inCart: !book.cart } : book
      // )
    },
    removeFromCart: (state, action) => {
      const bookId = action.payload
      const cardIndex = state.list.findIndex((book) => book.id === bookId)
      state.cart.splice(cardIndex, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.books.map((book: Book) => {
          return { ...book, isFavorite: false, id: book.isbn13 }
        })
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(state.list)
        state.list = action.payload.books.map((book: Book) => {
          return { ...book, isFavorite: false, id: book.isbn13 }
        })
        state.pagesCount = Math.ceil(action.payload.total / 10)
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { addFavorite, addToCart, removeFromCart } = booksSlice.actions
export const booksReducer = booksSlice.reducer
