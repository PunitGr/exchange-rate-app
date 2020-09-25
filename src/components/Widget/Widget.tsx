import React, {useEffect, useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import {FETCH_EXCHANGE_RATE, FETCH_HISTORY} from '../../store/types'
import {State} from '../../@types'
import Modal from '../common/Modal'
import HistoryChart from './HistoryChart'
import GoingUp from '../Icons/GoingUp'
import GoingDown from '../Icons/GoingDown'
import color from '../../utils/color'

interface WidgetProps {
  sourceCurrency: string
  targetCurrency: string
}

const RoundButton = styled.a`
  display: flex;
  background-color: ${color.primary};
  border-radius: 20px;
  padding: 4px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  min-width: 120px;
  width: auto;
  height: 24px;
  align-self: center;
  text-decoration: none;
  cursor: pointer;
  color: ${color.white};
  font-size: 14px;
`

const Section = styled.div`
  margin-top: 16px;
`

const Widget = (props: WidgetProps): JSX.Element => {
  const dispatch = useDispatch()

  const fetchExchangeRate = useCallback(() => {
    dispatch({
      type: FETCH_EXCHANGE_RATE,
      payload: props
    })
  }, [dispatch, props])

  const fetchHistory = useCallback(() => {
    dispatch({
      type: FETCH_HISTORY,
      payload: props
    })
  }, [dispatch, props])

  useEffect(() => {
    fetchExchangeRate()
    fetchHistory()

    const interval = setInterval(() => {
      fetchExchangeRate()
    }, 10000)

    return () => clearInterval(interval)
  }, [props.targetCurrency, props.sourceCurrency])

  const state = useSelector((state: State) => state)
  const exchangeRate = state.exchangeRate || 0.0

  const getIconToShow = ({history} = state) => {
    const yAxis = history?.data?.yAxis

    if (!yAxis) {
      return ''
    }

    const lastRate = yAxis[yAxis.length - 2]
    const oldRate = yAxis[yAxis.length - 1]

    if (typeof lastRate === 'number' && typeof oldRate === 'number') {
      if (lastRate - oldRate < 0) {
        return 'down'
      } else if (lastRate - oldRate >= 0) {
        return 'up'
      }
    }
  }
  const [modalVisibility, setModalVisibility] = useState(false)

  const toggleModal = () => {
    setModalVisibility(!modalVisibility)
  }

  const renderIcon = () => {
    if (getIconToShow() === 'up') {
      return <GoingUp />
    }

    return <GoingDown />
  }

  return (
    <React.Fragment>
      <RoundButton onClick={toggleModal} data-testid='exchange-rate-btn'>
        {renderIcon()}
        <span data-testid='exchange-rate'>{`${
          props.targetCurrency
        } ${exchangeRate.toFixed(4)}`}</span>
      </RoundButton>
      <Modal onToggle={toggleModal} isVisible={modalVisibility}>
        <Section>
          <HistoryChart />
        </Section>
      </Modal>
    </React.Fragment>
  )
}

export default Widget
