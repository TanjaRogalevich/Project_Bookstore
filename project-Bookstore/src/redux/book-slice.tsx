import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBook } from '../services/book'
import { Book } from '../types/interface'
import { BookState } from '../types/interfaceStates'

const initialState : BookState = {
  data: {} as Book,
  isLoading: false,
  error: null
}

export const fetchBook = createAsyncThunk('book/fetchBook', async (id: string | undefined, { rejectWithValue }) => {
  try {
    return await requestBook(id)
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const bookReducer = bookSlice.reducer
