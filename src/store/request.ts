import axios from 'axios'
import {getDate} from '../utils/index'

export const getCurrency = (): Promise<Response> => {
  return axios.get('https://api.exchangeratesapi.io/latest')
}

export const getExchangeRate = (options: {
  sourceCurrency: string
  targetCurrency: string
}): Promise<Response> => {
  const {sourceCurrency, targetCurrency} = options

  return axios.request({
    url: 'https://api.exchangeratesapi.io/latest',
    params: {
      base: sourceCurrency,
      symbols: targetCurrency
    }
  })
}

export const fetchHistory = (options: {
  sourceCurrency: string
  targetCurrency: string
}): Promise<Response> => {
  const {sourceCurrency, targetCurrency} = options

  return axios.request({
    url: 'https://api.exchangeratesapi.io/history',
    params: {
      start_at: getDate(1),
      end_at: getDate(),
      base: sourceCurrency,
      symbols: targetCurrency
    }
  })
}
