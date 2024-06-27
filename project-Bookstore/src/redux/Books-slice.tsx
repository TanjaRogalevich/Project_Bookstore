import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { requestBooks, requestSearch } from '../services/book'
import { Book } from '../types/type'
import { getFavoritesFromLocalStorage, getCartFromLocalStorage } from '../utils/getFromLocalStorage'
import { setFavoritesToLocalStorage, setCartToLocalStorage } from '../utils/setFromLocalStorage'

interface BooksState {
  list: Book[];
  cart:Book[];
  favorites:Book[];
  isLoading: boolean;
  error: string | null | undefined;
  pagesCount: number | null;
}

interface Fetch {
  query: string | undefined;
  page: string | number;
}

const initialState: BooksState = {
  list: [],
  cart: getCartFromLocalStorage() || [],
  favorites: getFavoritesFromLocalStorage() || [],
  isLoading: false,
  error: null,
  pagesCount: null
}

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    return await requestBooks()
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

export const fetchSearch = createAsyncThunk('search/fetchSearch', async ({ query, page }: Fetch, { rejectWithValue }) => {
  try {
    return await requestSearch(query, page)
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload
      const book = state.list.find(book => book.id === bookId)
      const bookInFavorites = state.favorites.find(book => book.id === bookId)
      if (book) {
        book.isFavorite = !book.isFavorite
        if (book.isFavorite && !bookInFavorites) {
          state.favorites.push(book)
        }
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites))
      state.favorites = getFavoritesFromLocalStorage()
    },
    removeFromFavorites: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload
      state.favorites = state.favorites.filter(book => book.id !== bookId)
      const book = state.list.find(book => book.id === bookId)
      if (book) {
        book.isFavorite = false
      }

      setFavoritesToLocalStorage(state.favorites)
      state.favorites = getFavoritesFromLocalStorage()
    },
    addToCart: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload
      const book = state.list.find(book => book.id === bookId)
      const bookInCart = state.cart.find(book => book.id === bookId)
      if (book) {
        book.inCart = !book.inCart
        if (book.inCart && !bookInCart) {
          state.cart.push(book)
        }
      }

      setCartToLocalStorage(state.cart)
      state.cart = getCartFromLocalStorage()
    },
    removeFromCart: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload
      state.cart = state.cart.filter(book => book.id !== bookId)
      const book = state.list.find(book => book.id === bookId)
      if (book) {
        book.inCart = false
      }

      setCartToLocalStorage(state.cart)
      state.cart = getCartFromLocalStorage()
    },
    increaseQuantity: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload
      const book = state.cart.find(book => book.id === bookId)
      if (book) {
        book.quantity = book.quantity + 1
      }

      setCartToLocalStorage(state.cart)
      state.cart = getCartFromLocalStorage()
    },
    decreaseQuantity: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload
      const book = state.cart.find(book => book.id === bookId)
      if (book && book.quantity > 1) {
        book.quantity = book.quantity - 1
      }

      setCartToLocalStorage(state.cart)
      state.cart = getCartFromLocalStorage()
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
          return { ...book, isFavorite: false, inCart: false, quantity: 1, id: book.isbn13 }
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
          return { ...book, isFavorite: false, inCart: false, quantity: 1, id: book.isbn13 }
        })
        state.pagesCount = Math.ceil(action.payload.total / 10)
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { addFavorite, addToCart, removeFromFavorites, removeFromCart, increaseQuantity, decreaseQuantity } = booksSlice.actions
export const booksReducer = booksSlice.reducer
