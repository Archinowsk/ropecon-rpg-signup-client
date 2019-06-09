/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { SubmissionError } from 'redux-form'
import { submitLogin } from 'views/login/loginActions'
import LoginForm from 'views/login/components/LoginForm'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  submitLogin: Function,
}

const LoginView: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { submitLogin } = props
  const { t } = useTranslation()

  const submit = async form => {
    let response = null
    try {
      response = await submitLogin(form)
    } catch (error) {
      console.log(`onSubmitLogin error:`, error)
    }

    if (response && response.code === 21) {
      throw new SubmissionError({
        _error: t('error.loginFailed'),
      })
    }
  }

  return (
    <div className='login-view'>
      <LoginForm onSubmit={submit} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
  }
}

export default connect(
  mapStateToProps,
  { submitLogin }
)(LoginView)
