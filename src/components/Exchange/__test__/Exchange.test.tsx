import React from 'react'
import {fireEvent, render, cleanup} from '@testing-library/react'

import {useSelector, useDispatch} from 'react-redux'
import Exchange from '../Exchange'
import mockStore from '../../../store/mockStore'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest.mock('chart.js')

const useSelectorMock = useSelector as jest.Mock
const useDispatchMock = useDispatch as jest.Mock

describe('<Exchange />', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn())
    useSelectorMock.mockImplementation(() => ({...mockStore}))
  })

  afterEach(cleanup)

  it('Should update pocket 1', () => {
    const {getAllByTestId} = render(<Exchange />)
    const select = getAllByTestId('currency') as HTMLSelectElement[]
    expect(select[0].value).toBe('EUR')
    fireEvent.click(select[0], {target: {value: 'GBP'}})
    expect(select[0].value).toBe('GBP')
    const input = getAllByTestId('value') as HTMLInputElement[]
    expect(input[0].value).toBe('')
    fireEvent.click(input[0], {target: {value: 123}})
    expect(input[0].value).toBe('123')
  })

  it('Should update pocket 2', () => {
    const {getAllByTestId} = render(<Exchange />)

    const select = getAllByTestId('currency') as HTMLSelectElement[]
    expect(select[1].value).toBe('USD')
    fireEvent.click(select[1], {target: {value: 'INR'}})
    expect(select[1].value).toBe('INR')

    const input = getAllByTestId('value') as HTMLInputElement[]
    expect(input[1].value).toBe('')
    fireEvent.click(input[1], {target: {value: 143}})
    expect(input[1].value).toBe('143')
  })

  it('Should swap pockets', () => {
    const {getAllByTestId, getByTestId} = render(<Exchange />)

    const selectElements = getAllByTestId('currency') as HTMLSelectElement[]
    const btn = getByTestId('swap-pocket-btn') as HTMLAnchorElement

    expect(selectElements[0].value).toBe('EUR')
    expect(selectElements[1].value).toBe('USD')

    // Fire event for swapping pocketBalances
    fireEvent.click(btn)
  })
})
