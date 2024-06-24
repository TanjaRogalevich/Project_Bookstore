import { client } from '../api/client'
import { booksEndpoint, bookEndpoint, searchEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}

async function requestBook (id) {
  const { data } = await client.get(`${bookEndpoint}${id}`)
  return data
}

// async function requestSearch (params = {}) {
//   const { data } = await client.get(searchEndpoint, { params })
//   return data
// }
async function requestSearch(query) {
  const { data } = await client.get(`${searchEndpoint}${query}`)
  return data
}

export { requestBooks, requestBook, requestSearch }
