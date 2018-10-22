/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import config from 'config'

type Props = {
  input: Object,
  label?: string,
  type: string,
  meta: Object,
  t: Function,
}

const CheckboxField = (props: Props) => {
  const {
    input,
    label = '',
    type,
    meta: { touched, error },
    t,
  } = props

  const registerDescriptionLink = `${config.apiServerURL}/rekisteriseloste.txt`

  return (
    <div className="form-row">
      <div className="form-field">
        <div className="form-input-wrapper" id={`${input.name}-wrapper`}>
          <input
            className="form-input checkbox"
            {...input}
            placeholder={label}
            type={type}
            id={input.name}
          />
        </div>

        <label htmlFor={label}>
          {t('iAgree')}{' '}
          <a
            href={registerDescriptionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('registerDescription')}
          </a>
        </label>
      </div>

      {touched && error && <div className="form-field-error">{error}</div>}
    </div>
  )
}

export default withNamespaces()(CheckboxField)
