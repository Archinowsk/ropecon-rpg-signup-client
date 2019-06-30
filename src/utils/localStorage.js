/* @flow */
import type { LocalStorageState } from 'flow/redux.flow'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null || typeof serializedState !== 'string') {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export const saveState = (state: LocalStorageState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}
