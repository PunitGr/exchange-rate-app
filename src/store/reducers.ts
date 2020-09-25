import initialState from './initialState'
import * as types from './types'

import {State, Action} from '../@types'

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.FETCH_CURRENCIES:
    case types.FETCH_EXCHANGE_RATE:
      return {
        ...state,
        error: null
      }
    case types.FETCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        error: null,
        currencies: action.payload.currency,
        pockets: action.payload.pockets
      }
    case types.FETCH_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        error: null,
        exchangeRate: action.payload
      }
    case types.FETCH_CURRENCIES_ERROR:
    case types.FETCH_CURRENCIES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case types.FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          ...state.history,
          error: null,
          data: action.payload
        }
      }

    case types.UPDATE_CURRENCY:
      const {type: currencyType, currency} = action.payload

      if (currencyType && currency) {
        return {
          ...state,
          [`${currencyType}Currency`]: currency
        }
      }

      console.warn('Provide a valid currency')
      return state

    case types.UPDATE_AMOUNT:
      const {type, amount} = action.payload
      let sourceAmtVal = 0
      let targetAmtVal = 0

      if (amount) {
        sourceAmtVal = type === 'source' ? amount : amount / state.exchangeRate
        targetAmtVal = type === 'source' ? state.exchangeRate * amount : amount
      }

      if (type && typeof amount === 'number' && amount >= 0) {
        return {
          ...state,
          sourceAmount: Number(sourceAmtVal.toFixed(4)),
          targetAmount: Number(targetAmtVal.toFixed(4))
        }
      }

      console.warn('Provide a valid amount')
      return state

    case types.EXCHANGE_CURRENCY:
      const {
        sourceCurrency,
        targetCurrency,
        sourceAmount,
        targetAmount,
        pockets
      } = state

      const amountCurrencySource =
        pockets[sourceCurrency] - Number(sourceAmount)
      const amountCurrencyTarget =
        pockets[targetCurrency] + Number(targetAmount)

      return {
        ...state,
        sourceAmount: 0,
        targetAmount: 0,
        pockets: {
          ...state.pockets,
          [sourceCurrency]: amountCurrencySource,
          [targetCurrency]: amountCurrencyTarget
        }
      }

    case types.SWAP_POCKETS:
      return {
        ...state,
        sourceCurrency: state.targetCurrency,
        targetCurrency: state.sourceCurrency,
        targetAmount: state.sourceAmount,
        sourceAmount: state.targetAmount
      }

    default:
      return state
  }
}

export default reducer
