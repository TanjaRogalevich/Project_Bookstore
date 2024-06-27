export function setFavoritesToLocalStorage (favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function setCartToLocalStorage (cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
