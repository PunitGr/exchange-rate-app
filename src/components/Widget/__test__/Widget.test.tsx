import React from 'react'
import {fireEvent, render} from '@testing-library/react'

import Widget from '../Widget'
import {useSelector, useDispatch} from 'react-redux'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))
jest.mock('chart.js')

const useSelectorMock = useSelector as jest.Mock
const useDispatchMock = useDispatch as jest.Mock

describe('<Widget />', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn())
    useSelectorMock.mockImplementation(() => ({
      exchangeRate: 1.179,
      history: {
        data: {
          xAxis: ['10-10-2020', '11-10-2020', '12-10-2020'],
          yAxis: [1.79, 1.09, 1.99]
        }
      }
    }))
  })

  test('Widget is present', () => {
    const {getByTestId, getByLabelText} = render(
      <Widget sourceCurrency='USD' targetCurrency='EUR' />
    )

    const element = getByTestId('exchange-rate')
    expect(element.innerHTML).toBe('EUR 1.1790')

    const icon = getByLabelText('going-down')
    expect(icon).toBeInTheDocument()
  })

  test('Should Open/Close Modal via Widget', () => {
    const {getByTestId} = render(
      <Widget sourceCurrency='USD' targetCurrency='EUR' />
    )

    // Open Modal
    const element = getByTestId('exchange-rate-btn')
    fireEvent.click(element)

    const closeElement = getByTestId('close')
    expect(closeElement).toBeInTheDocument()

    // Close Modal
    fireEvent.click(closeElement)
    expect(closeElement).not.toBeInTheDocument()
  })
})
