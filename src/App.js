/* @flow */
import React from 'react'
import { hot } from 'react-hot-loader'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import Routes from 'Routes'
import LanguageSelector from 'components/LanguageSelector'
import config from 'config'

type Props = {
  t: Function,
  username: string,
  loggedIn: boolean,
  serial: string,
}

const App = (props: Props) => {
  const { t, username, loggedIn, serial } = props
  const { appOpen } = config

  return (
    <React.Fragment>
      <header>
        <h1>
          <a href="/" className="logo">
            Konsti
          </a>
        </h1>
        <p>{t('header')}</p>
        <LanguageSelector />

        {loggedIn && (
          <span className="username">
            {t('user')}: {username} | {t('code')}: {serial}
          </span>
        )}
      </header>

      <div className="body">
        {!appOpen && t('closingMessage')}
        {/* $FlowFixMe */}
        {appOpen && <Routes />}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    serial: state.login.serial,
    loggedIn: state.login.loggedIn,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {}
}

export default hot(module)(
  withNamespaces()(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
)
