export function getFavoritesFromLocalStorage () {
  const favorites = localStorage.getItem('favorites')

  if (!favorites) return null

  return JSON.parse(favorites)
}

export function getCartFromLocalStorage () {
  const cart = localStorage.getItem('cart')

  if (!cart) return null

  return JSON.parse(cart)
}
