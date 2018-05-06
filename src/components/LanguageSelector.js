import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import i18n from '../utils/i18n'

const LanguageSelector = props => {
  const { t } = props

  const language = i18n.language

  // Language toggle
  const toggle = lng => i18n.changeLanguage(lng)
  const setLanguage = event => {
    toggle(event.target.value)
  }

  return (
    <div>
      <select id="language" type="text" value={language} onChange={setLanguage}>
        <option value="en">{t('language.english')}</option>
        <option value="fi">{t('language.finnish')}</option>
      </select>
    </div>
  )
}

LanguageSelector.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(LanguageSelector)