const state = {
  error: null,
  currencies: [],
  exchangeRate: 0,
  history: {
    error: null,
    data: {
      xAxis: [],
      yAxis: []
    }
  },
  sourceCurrency: 'EUR',
  targetCurrency: 'USD',
  sourceAmount: 0,
  targetAmount: 0,
  pockets: {}
}

export default state
