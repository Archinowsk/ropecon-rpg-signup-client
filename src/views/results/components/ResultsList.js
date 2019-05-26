/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import ResultsByGameTitle from './ResultsByGameTitle'
import ResultsByUsername from './ResultsByUsername'
import type { Result } from 'flow/result.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  results: Array<Result>,
}

/*
type State = {
  sortedBy: string,
}
*/

const ResultsList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { results } = props
  const { t } = useTranslation()
  const [sortedBy, setSortedBy] = React.useState('')

  React.useEffect(() => {
    setSortedBy('username')
  }, [])

  const buttons = ['username', 'gameTitle']

  return (
    <div className='results-list'>
      <div className='results-buttons'>
        <span>{t('sortBy')} </span>

        {buttons.map(name => {
          return (
            <button
              className={sortedBy === name ? 'active' : ''}
              value={name}
              onClick={() => setSortedBy(name)}
              key={name}
            >
              {t(name)}
            </button>
          )
        })}
      </div>
      {sortedBy === 'username' && <ResultsByUsername results={results} />}
      {sortedBy === 'gameTitle' && <ResultsByGameTitle results={results} />}
    </div>
  )
}

export default ResultsList