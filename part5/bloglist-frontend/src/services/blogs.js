import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => token = newToken

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObj => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = await axios.post(baseUrl, blogObj, config)
  return request.data
}

const update = async (id, blogObj) => {
  const request = await axios.put(`${baseUrl}/${id}`, blogObj)
  return request.data
}

const remove = async id => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, setToken, update, remove }