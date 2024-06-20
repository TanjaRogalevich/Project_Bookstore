import { client } from '../api/client'
import { booksEndpoint } from '../api/endpoints'

async function requestBooks (params = {}) {
  const { data } = await client.get(booksEndpoint, { params })
  return data
}

export { requestBooks }
