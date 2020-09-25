/* eslint-disable @typescript-eslint/no-explicit-any */
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects'

import * as types from './types'
import {getCurrency, getExchangeRate, fetchHistory} from './request'
import {Action} from '../@types'
import {SagaIterator} from 'redux-saga'

function* fetchCurrenciesSaga(): SagaIterator {
  try {
    const response = yield call(getCurrency)
    const {rates} = response.data
    const data = Object.keys(rates)

    data.push('EUR')
    const pockets = data.reduce((acc, currency: string) => {
      return {
        ...acc,
        [currency]: 400
      }
    }, {})

    yield put({
      type: types.FETCH_CURRENCIES_SUCCESS,
      payload: {
        currency: data,
        pockets
      }
    })
  } catch (error) {
    yield put({
      type: types.FETCH_CURRENCIES_ERROR,
      payload: error
    })
  }
}

function* fetchExchangeRateSaga(action: Action): SagaIterator {
  try {
    const response = yield call(getExchangeRate, action.payload)
    const rate = response?.data?.rates[action.payload.targetCurrency]

    yield put({
      type: types.FETCH_EXCHANGE_RATE_SUCCESS,
      payload: rate
    })
  } catch (error) {
    yield put({
      type: types.FETCH_EXCHANGE_RATE_ERROR,
      payload: error
    })
  }
}

function* fetchHistorySaga(action: Action): SagaIterator {
  try {
    const response = yield call(fetchHistory, action.payload)
    const currencyHistory = response?.data?.rates

    yield put({
      type: types.FETCH_HISTORY_SUCCESS,
      payload: {
        xAxis: Object.keys(currencyHistory),
        yAxis: Object.values(currencyHistory).reduce((acc, rate: any) => {
          const values = Object.values(rate)

          if (Array.isArray(acc) && Array.isArray(values)) {
            return [...acc, ...values]
          }

          return acc
        }, [])
      }
    })
  } catch (error) {
    yield put({
      type: types.FETCH_HISTORY_ERROR,
      payload: error
    })
  }
}

export default function* rootSaga(): Generator<any, void, undefined> {
  yield all([
    yield takeEvery(types.FETCH_EXCHANGE_RATE, fetchExchangeRateSaga),
    yield takeLatest(types.FETCH_CURRENCIES, fetchCurrenciesSaga),
    yield takeEvery(types.FETCH_HISTORY, fetchHistorySaga)
  ])
}
