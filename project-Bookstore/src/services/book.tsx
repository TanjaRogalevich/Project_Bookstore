import { client } from '../api/client'
import { booksEndpoint, bookEndpoint, searchEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}

async function requestBook (id: string | undefined) {
  const { data } = await client.get(`${bookEndpoint}/${id}`)
  return data
}

async function requestSearch (query: string | undefined, page: string | undefined) {
  const { data } = await client.get(`${searchEndpoint}/${query}/${page}`)
  return data
}

export { requestBooks, requestBook, requestSearch }
