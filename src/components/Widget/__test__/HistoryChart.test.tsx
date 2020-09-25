import React from 'react'
import {render} from '@testing-library/react'

import HistoryChart from '../HistoryChart'
import {useSelector} from 'react-redux'

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))
jest.mock('chart.js')

const useSelectorMock = useSelector as jest.Mock

describe('<HistoryChart />', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation(() => ({
      history: {
        data: {
          xAxis: ['20-10-2020', '21-10-2020', '23-10-2020'],
          yAxis: [1.234, 1.209, 1.01]
        }
      }
    }))
  })

  it('renders history chart', () => {
    const {getByTestId} = render(<HistoryChart />)

    expect(getByTestId('history-chart')).toBeInTheDocument()
  })
})
