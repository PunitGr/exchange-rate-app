import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'

import Flex from '../common/Flex'
import {Option, State} from '../../@types'
import Select from '../common/Select'
import Input from '../common/Input'
import color from '../../utils/color'
import {UPDATE_AMOUNT, UPDATE_CURRENCY} from '../../store/types'

interface PocketProps {
  color?: string
  currency: string
  amount: number | string
  options: Option[]
  type: string
}

interface TextProps {
  hasError: boolean
  align?: string
}

const Container = styled.div`
  padding: 4px 32px;
  display: flex;
  background-color: ${(props) => props.color || 'none'};
  height: 180px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 4px 24px;
  }
`

const Text = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: ${(props: TextProps) => (props.hasError ? color.error : color.dark)};
  text-align: ${(props: TextProps) => props.align || 'center'};
`

const Pocket = (props: PocketProps): JSX.Element => {
  const dispatch = useDispatch()
  const {pockets} = useSelector((state: State) => state)
  const {options, color, type, amount, currency} = props
  const hasError =
    type === 'source' && pockets && pockets[currency] < Number(amount)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target

    dispatch({
      type: UPDATE_CURRENCY,
      payload: {
        type,
        currency: value
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target

    dispatch({
      type: UPDATE_AMOUNT,
      payload: {
        type,
        amount: !value ? 0 : parseFloat(value)
      }
    })
  }

  const amt = amount === 0 ? amount.toString().replace(/^0+/, '') : amount

  return (
    <Container color={color}>
      <Flex direction='column'>
        <Select
          name='currency'
          value={currency}
          onChange={handleSelect}
          data-testid='currency'
        >
          {options.map((option: Option, index: number) => {
            return (
              <option value={option.value} key={`${option.value}-${index}`}>
                {option.label}
              </option>
            )
          })}
        </Select>
        <Text hasError={hasError} data-testid='pocket-balance'>
          {pockets &&
            pockets[currency] &&
            `Balance: ${currency} ${pockets[currency].toFixed(2)}`}
        </Text>
      </Flex>
      <Flex direction='column'>
        <Input
          type='number'
          data-testid='value'
          value={amt}
          onChange={handleChange}
          placeholder='0'
        />
        {hasError && (
          <Text hasError={hasError} align='right'>
            Not enough balance
          </Text>
        )}
      </Flex>
    </Container>
  )
}

export default Pocket
