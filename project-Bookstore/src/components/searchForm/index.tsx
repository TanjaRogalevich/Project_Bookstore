import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export function SearchForm () {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleChangeSearch (event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleSubmit (event: FormEvent) {
    event.preventDefault()
    navigate(`/books/search/${search}/page/1`)
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <input type="search" className="search-form__input" placeholder="Search..." onChange={handleChangeSearch} value={search} />
      <button type="submit" className="search-form__button">Search</button>
    </form>
  )
}
