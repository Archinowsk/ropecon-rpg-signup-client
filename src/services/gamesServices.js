/* @flow */
import api from 'utils/api'
import setAuthToken from 'utils/setAuthToken'

export const postGamesUpdate = async () => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/games')
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postGamesUpdate error: ${error}`)
    }
  }

  if (response.status !== 200 || !response.data) {
    console.log('Response status !== 200, reject')
    return Promise.reject(response)
  }

  return response.data
}

export const getGames = async () => {
  let response = null
  try {
    response = await api.get('/games')
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`getGames error: ${error}`)
    }
  }

  if (response.status !== 200 || !response.data) {
    console.log('Response status !== 200, reject')
    return Promise.reject(response)
  }

  return response.data
}