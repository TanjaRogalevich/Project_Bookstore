import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBooks } from '../services/book'

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
  limit: 20
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    return await requestBooks()
  } catch (e) {
    return rejectWithValue(e.message)
  }
})
// export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetch('https://api.itbook.store/1.0/new')
//     const data = await response.json()
//     return data.books
//   } catch (e) {
//     return rejectWithValue((e as Error).message)
//   }
// })

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
        console.log(action.payload)
        state.list = action.payload.books.map((book) => {
          return { ...book, likes: 0, dislikes: 0, isFavorite: false }
        })
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
        console.log(state.error)
      })
  }
})

// export const { addLike, addDislike, addFavorite } = booksSlice.actions
export const booksReducer = booksSlice.reducer
