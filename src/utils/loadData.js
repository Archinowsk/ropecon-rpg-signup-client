/* @flow */
import { submitGetResults } from 'views/results/resultsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitGetGroup } from 'views/group/groupActions'

export const loadData = async (store: Object) => {
  const state = store.getState()

  const { loggedIn, userGroup, playerGroup, username } = state.login
  const { startTime } = state.admin

  // const adminSettingsLoaded = state.admin.adminSettingsLoaded
  // const myGamesLoaded = state.myGames.myGamesLoaded

  // Get games data
  await store.dispatch(submitGetGames())

  /*
  if (!adminSettingsLoaded) {
    // Get settings data
    await store.dispatch(submitGetSettings())
  }
  */

  // Get settings data
  await store.dispatch(submitGetSettings())

  if (loggedIn) {
    // Get results data
    if (startTime) {
      await store.dispatch(submitGetResults(startTime))
    }

    // Get user data
    if (userGroup === 'user') {
      await store.dispatch(submitGetUser(username))
    }

    // Get group members
    if (playerGroup !== '0') {
      await store.dispatch(submitGetGroup(playerGroup))
    }
  }
}
