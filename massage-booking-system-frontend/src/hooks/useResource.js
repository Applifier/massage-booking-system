import { useState } from 'react'
import axios from 'axios'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    //console.log('GET ALL')
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async data => {
    //console.log('CREATE')
    const newResource = await axios.post(baseUrl, data)
    const updatedResources = resources.concat(newResource.data)
    setResources(updatedResources)
  }

  const update = async (id, data, type = '') => {
    //console.log('UPDATE')
    const updatedResource = await axios.put(`${baseUrl}/${id}/${type}`, data)
    if (updatedResource.data.hasOwnProperty('_id')) {
      setResources(
        resources.map(resource =>
          resource._id !== id ? resource : updatedResource.data
        )
      )
    }
  }

  const remove = async id => {
    //console.log('REMOVE')
    const deletedResource = await axios.delete(`${baseUrl}/${id}`)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const getOne = async id => {
    //console.log('GET ONE')
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }

  const getInterval = async (start, end) => {
    //console.log('GET INTERVAL')
    const response = await axios.get(`${baseUrl}/${start}/${end}`)
    setResources(response.data)
  }

  const service = {
    getAll,
    create,
    remove,
    update,
    getOne,
    getInterval
  }

  return [resources, service]
}

export default useResource
