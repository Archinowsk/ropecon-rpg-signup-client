/* @flow */
import { postGroup } from 'services/groupService'

export const SUBMIT_UPDATE_GROUP = 'SUBMIT_UPDATE_GROUP'

const submitJoinGroupAsync = ({ playerGroup }) => {
  return {
    type: SUBMIT_UPDATE_GROUP,
    playerGroup,
  }
}

export const submitJoinGroup = (groupData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitJoinGroupAsync({ playerGroup: groupData.groupCode }))
    }

    console.log('response', response)

    return response
  }
}

/*
export const submitJoinGroup = async (groupData: Object) => {
  let response = null
  try {
    response = await postGroup(groupData)
  } catch (error) {
    console.log(`postGroup error: ${error}`)
  }

  return response
}
*/

const submitCreateGroupAsync = ({ playerGroup }) => {
  return {
    type: SUBMIT_UPDATE_GROUP,
    playerGroup,
  }
}

export const submitCreateGroup = (groupData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGroup(groupData)
    } catch (error) {
      console.log(`postGroup error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitCreateGroupAsync({ playerGroup: groupData.groupCode }))
    }

    console.log('response', response)

    return response
  }
}