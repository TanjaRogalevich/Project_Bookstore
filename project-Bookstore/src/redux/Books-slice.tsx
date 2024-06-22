import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBooks } from '../services/book'
import { Book } from '../types/type'

interface BooksState {
  list: [],
  isLoading: boolean,
  error: any,
  limit: number
}

const initialState: BooksState = {
  list: [],
  isLoading: false,
  error: null,
  limit: 12
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    return await requestBooks({ limit: 3 })
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // addLike: (state, action) => {
    //   const { postId } = action.payload
    //   state.list = state.list.map(post =>
    //     post.id === postId ? { ...post, likes: post.likes + 1 } : post
    //   )
    // },

    // addDislike: (state, action) => {
    //   const { postId } = action.payload
    //   state.list = state.list.map(post =>
    //     post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    //   )
    // },

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
  }
})

export const { addFavorite } = booksSlice.actions
export const booksReducer = booksSlice.reducer
