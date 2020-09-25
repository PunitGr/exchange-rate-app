/* eslint-disable @typescript-eslint/no-explicit-any */
export interface State {
  error: string | null
  currencies: string[]
  exchangeRate: number
  history: {
    error: string | null
    data: {
      xAxis: string[]
      yAxis: number[]
    }
  }
  sourceCurrency: string
  targetCurrency: string
  sourceAmount: number
  targetAmount: number
  pockets: {
    [key: string]: number
  }
}

export interface Action {
  type: string
  payload?: any
}

export interface Option {
  value: string
  label: string
}
