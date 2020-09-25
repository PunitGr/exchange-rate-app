import mockStore from '../mockStore'
import reducer from '../reducers'
import {
  SWAP_POCKETS,
  EXCHANGE_CURRENCY,
  UPDATE_AMOUNT,
  UPDATE_CURRENCY
} from '../types'

const initialState = {...mockStore}
it('should swap pockets', () => {
  const targetAmount = 321
  const sourceAmount = 123

  const state = reducer(
    {...initialState, targetAmount, sourceAmount},
    {type: SWAP_POCKETS}
  )

  expect(state).toEqual({
    ...initialState,
    sourceCurrency: 'USD',
    targetCurrency: 'EUR',
    targetAmount: 123,
    sourceAmount: 321
  })
})

it('should not exchange currency if no values provided', () => {
  const state = reducer(initialState, {type: EXCHANGE_CURRENCY})

  expect(state).toEqual(initialState)
})

it('should exchange currency when provided values', () => {
  const targetAmount = 200 * initialState.exchangeRate
  const sourceAmount = 200

  // Exchanges the value which is already in state
  const state = reducer(
    {...initialState, targetAmount, sourceAmount},
    {type: EXCHANGE_CURRENCY}
  )

  expect(state).toEqual({
    ...initialState,
    targetAmount: 0,
    sourceAmount: 0,
    pockets: {
      ...initialState.pockets,
      USD: targetAmount + initialState.pockets.USD,
      EUR: initialState.pockets.EUR - sourceAmount
    }
  })
})

it('should update target amount', () => {
  const targetAmount = 200

  const state = reducer(initialState, {
    type: UPDATE_AMOUNT,
    payload: {
      amount: targetAmount,
      type: 'target'
    }
  })

  expect(state).toEqual({
    ...initialState,
    targetAmount,
    sourceAmount: 169.6353
  })
  expect(state.targetAmount).toBe(200)
})

it('should not update negative source amount', () => {
  const sourceAmount = -100
  console.warn = jest.fn()

  const state = reducer(initialState, {
    type: UPDATE_AMOUNT,
    payload: {
      amount: sourceAmount,
      type: 'source'
    }
  })

  expect(console.warn).toHaveBeenCalledWith('Provide a valid amount')
  expect(state.sourceAmount).toBe(0)
})

it('should update target currency', () => {
  const targetCurrency = 'EUR'

  const state = reducer(initialState, {
    type: UPDATE_CURRENCY,
    payload: {
      currency: targetCurrency,
      type: 'target'
    }
  })

  expect(state.targetCurrency).toBe(targetCurrency)
  expect(state).toEqual({...initialState, targetCurrency})
})

it(`should not update source currency with ''`, () => {
  const sourceCurrency = ''
  console.warn = jest.fn()

  const state = reducer(initialState, {
    type: UPDATE_CURRENCY,
    payload: {
      currency: sourceCurrency,
      type: 'source'
    }
  })

  expect(console.warn).toHaveBeenCalledWith('Provide a valid currency')

  // default one
  expect(state.sourceCurrency).toBe('EUR')
  expect(state).toEqual(initialState)
})
