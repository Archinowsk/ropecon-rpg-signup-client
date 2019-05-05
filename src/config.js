/* @flow */

// webpack config must be babeled for this to work
type Config = {
  appName: string,
  staging: boolean,
  appOpen: boolean,
  SIGNUP_END_TIME: number,
  SIGNUP_OPEN_TIME: number,
  MESSAGE_DELAY: number,
  TIME_NOW: string,
  CONVENTION_START_TIME: string,
  DAY_START_TIME: number,
  env: string,
  apiServerURL: string,
}

const config: Config = {}

// App info
config.appName = 'Konsti'

// App status
config.apiServerURL = process.env.API_SERVER_URL || 'http://localhost:3000'
config.env = process.env.NODE_ENV || 'development'

// App settings
config.appOpen = true
config.SIGNUP_END_TIME = 30 // minutes
config.SIGNUP_OPEN_TIME = 4 // hours
config.MESSAGE_DELAY = 2000 // ms
config.TIME_NOW = '2018-07-27T13:40:00Z' // UTC date

// TODO: Move to admin view
config.CONVENTION_START_TIME = '2018-07-27T12:00:00Z' // UTC date
config.DAY_START_TIME = 8 // 08:00

module.exports = config
