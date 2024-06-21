import { client } from '../api/client'
import { booksEndpoint, bookEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}

async function requestBook (id) {
  const { data } = await client.get(`${bookEndpoint}${id}`)
  return data
}

export { requestBooks, requestBook }
