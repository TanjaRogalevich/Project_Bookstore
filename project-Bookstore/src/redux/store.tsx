import { configureStore } from '@reduxjs/toolkit'
import { authReducer, fetchRefreshJWT } from './auth-slice'
import { isTokenExpired } from '../utils/isTokenExpired'

let isRefreshing = false
const tokenExpirationMiddleware = (store) => (next) => (action) => {
  const state = store.getState()
  const currentToken = state.auth.jwt?.access

  if (currentToken && !isRefreshing && isTokenExpired(currentToken)) {
    isRefreshing = true
    store.dispatch(fetchRefreshJWT())
      .finally(() => { isRefreshing = false })
  }

  return next(action)
}

export const store = configureStore({
  reducer: {
    books: booksReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenExpirationMiddleware)
})
