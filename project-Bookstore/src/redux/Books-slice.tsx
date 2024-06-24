import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBooks, requestSearch } from '../services/book'
import { Book } from '../types/type'

interface BooksState {
  list: Book[],
  isLoading: boolean,
  error: any,
}

const initialState: BooksState = {
  list: [],
  isLoading: false,
  error: null
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params = {}, { rejectWithValue }) => {
  try {
    return await requestBooks({ params })
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchSearch = createAsyncThunk('search/fetchSearch', async (query, { rejectWithValue }) => {
  try {
    return await requestSearch(query)
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
      state.list = state.list.map(book =>
        book.id === bookId ? { ...book, favorite: !book.favorite } : book
      )
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
          return { ...book, favorite: false, id: book.isbn13 }
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
          return { ...book, favorite: false, id: book.isbn13 }
        })
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { addFavorite } = booksSlice.actions
export const booksReducer = booksSlice.reducer
