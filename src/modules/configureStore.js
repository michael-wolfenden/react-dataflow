/* global window */
import { createStore, compose, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import reddit from 'services/reddit'

import rootReducer from './rootReducer'
import rootLogic from './rootLogic'

const configureStore = () => {
  let storeEnhancers = []

  const logicMiddleware = createLogicMiddleware(rootLogic, { reddit })

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger') // eslint-disable-line
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : f => f

    storeEnhancers = [
      applyMiddleware(logicMiddleware, createLogger()),
      devTools,
    ]
  } else {
    storeEnhancers = [
      applyMiddleware(logicMiddleware),
    ]
  }

  return createStore(
    rootReducer,
    compose(...storeEnhancers)
  )
}

export default configureStore
