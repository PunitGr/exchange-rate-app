import React, {useEffect, useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {State} from '../../@types'
import {
  FETCH_CURRENCIES,
  EXCHANGE_CURRENCY,
  SWAP_POCKETS
} from '../../store/types'

import {
  Container,
  FloatingButton,
  Button,
  WidgetContainer,
  ButtonContainer,
  ExchangeButton
} from './styled'
import Pocket from '../Pocket/Pocket'
import Flex from '../common/Flex'
import UpDown from '../Icons/UpDown'
import Widget from '../Widget/Widget'
import Modal from '../common/Modal'
import {removeFromArr} from '../../utils'
import color from '../../utils/color'

const Exchange = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showExchangeConfirmation, setShowExchangeConfirmation] = useState(
    false
  )
  const {
    currencies,
    pockets,
    sourceCurrency,
    targetCurrency,
    sourceAmount,
    targetAmount
  } = useSelector((state: State) => state)

  const fetchCurrencies = useCallback(
    () => dispatch({type: FETCH_CURRENCIES}),
    [dispatch]
  )

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const options = currencies.map((currency: string) => ({
    value: currency,
    label: currency
  }))

  const handleSwap = () => {
    dispatch({
      type: SWAP_POCKETS
    })
  }

  const handleConfirm = () => {
    setShowExchangeConfirmation(!showExchangeConfirmation)

    dispatch({
      type: EXCHANGE_CURRENCY
    })
  }

  return (
    <React.Fragment>
      <Container>
        <Pocket
          type='source'
          color={color.white}
          currency={sourceCurrency}
          amount={sourceAmount}
          options={removeFromArr(options, targetCurrency)}
        />
        <WidgetContainer>
          <ExchangeButton onClick={handleSwap} data-testid='swap-pocket-btn'>
            <UpDown />
          </ExchangeButton>
          <Flex justify='center' width='100%'>
            <Widget
              sourceCurrency={sourceCurrency}
              targetCurrency={targetCurrency}
            />
          </Flex>
        </WidgetContainer>
        <Pocket
          type='target'
          currency={targetCurrency}
          amount={targetAmount}
          options={removeFromArr(options, sourceCurrency)}
        />
      </Container>
      <ButtonContainer>
        <FloatingButton
          onClick={() => setShowExchangeConfirmation(true)}
          disabled={
            (pockets && Number(sourceAmount) > pockets[sourceCurrency]) ||
            !sourceAmount
          }
          data-testid='exchange-btn'
        >
          Exchange
        </FloatingButton>
      </ButtonContainer>
      <Modal
        isVisible={showExchangeConfirmation}
        onToggle={() => setShowExchangeConfirmation(!showExchangeConfirmation)}
      >
        <Flex direction='column'>
          <p>Please confirm the transaction to make this exchange</p>
          <Flex direction='row' justify='flex-end'>
            <Button onClick={() => setShowExchangeConfirmation(false)}>
              Cancel
            </Button>
            <Button color={color.primary} onClick={handleConfirm}>
              Confirm
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </React.Fragment>
  )
}

export default Exchange
