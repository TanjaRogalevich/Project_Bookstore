export function setFavoritesToLocalStorage (favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export function setCartToLocalStorage (Cart) {
  localStorage.setItem('cart', JSON.stringify(Cart))
}
