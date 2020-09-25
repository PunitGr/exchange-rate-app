import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {useSelector, useDispatch} from 'react-redux'

import Pocket from '../Pocket'
import mockStore from '../../../store/mockStore'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest.mock('chart.js')

const useSelectorMock = useSelector as jest.Mock
const useDispatchMock = useDispatch as jest.Mock

const Options = [
  {
    value: 'EUR',
    label: 'EUR'
  },
  {
    value: 'USD',
    label: 'USD'
  },
  {
    value: 'GBP',
    label: 'GBP'
  }
]

describe('<Pocket />', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn())
    useSelectorMock.mockImplementation(() => ({...mockStore}))
  })

  it('renders a pocket', () => {
    const {getByTestId} = render(
      <Pocket type='source' currency='USD' options={Options} amount={120} />
    )

    const element = getByTestId('pocket-balance')

    expect(element.innerHTML).toBe('Balance: USD 400.00')
  })

  it('Selects a currency', () => {
    const {getByTestId} = render(
      <Pocket currency='USD' amount={120} type='target' options={Options} />
    )
    const select = getByTestId('currency') as HTMLSelectElement

    fireEvent.change(select, {target: {value: 'GBP'}})
  })

  it('Input a currency value', () => {
    const {getByTestId} = render(
      <Pocket currency='USD' amount={140} type='target' options={Options} />
    )
    const input = getByTestId('value') as HTMLInputElement

    fireEvent.change(input, {target: {value: 123}})
  })
})
