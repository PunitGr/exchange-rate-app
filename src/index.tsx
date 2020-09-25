import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from 'redux'

import {Provider} from 'react-redux'

import sagas from './store/sagas'
import reducer from './store/reducers'
import initialState from './store/initialState'
import Exchange from './components/Exchange/Exchange'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <Exchange />
  </Provider>,
  document.getElementById('root')
)
