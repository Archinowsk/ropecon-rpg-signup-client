/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'

type Props = {
  t: Function,
  enteredGames: Array<any>,
}

const MyEnteredList = (props: Props) => {
  const { enteredGames, t } = props

  // Sort games by time and name
  const sortedGames = enteredGames.sort((a, b) => {
    const keyA = moment(a.startTime) + a.title
    const keyB = moment(b.startTime) + b.title
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const GamesList = sortedGames.map(game => {
    const formattedDate = moment.utc(game.startTime).format('DD.M.YYYY HH:mm')

    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
          {formattedDate}: {game.title}
        </Link>
      </li>
    )
  })

  return (
    <div>
      <p>{t('enteredGames')}</p>
      <ul>
        {enteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default translate()(MyEnteredList)
