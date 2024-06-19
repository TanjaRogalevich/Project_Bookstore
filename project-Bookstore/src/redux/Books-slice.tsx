import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBooks } from '../services/book'

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  limit: 20
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params = {}, { rejectWithValue }) => {
  try {
    const offset = (params.page - 1) * initialState.limit
    return await requestBooks({ limit: initialState.limit, offset, ...params })
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

    // addFavorite: (state, action) => {
    //   const { postId } = action.payload
    //   state.list = state.list.map(post =>
    //     post.id === postId ? { ...post, favorite: !post.favorite } : post
    //   )
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.books.map((book) => {
          return { ...book, likes: 0, dislikes: 0, isFavorite: false }
        })
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

// export const { addLike, addDislike, addFavorite } = booksSlice.actions
export const sReducer = booksSlice.reducer
