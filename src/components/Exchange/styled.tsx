import styled from 'styled-components'
import color from '../../utils/color'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 786px;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-color: ${color.background};
`

export const WidgetContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -16px;
  padding: 0 48px;
`

export const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 24px;
  left: 0;
  text-align: center;
`

export const FloatingButton = styled.button`
  max-width: 730px;
  width: calc(100% - 48px);
  text-align: center;
  padding: 12px;
  line-height: 1.2;
  letter-spacing: 0.5px;
  font-size: 16px;
  background-color: ${(props) =>
    props.disabled ? color.disabled : color.primary};
  border-radius: 4px;
  color: ${color.white};
  border: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: none;
`

export const ExchangeButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: ${color.primary};
  border-color: ${color.primary};
  border-radius: 50%;
  color: ${color.white};
  border: 0;
  cursor: pointer;
  outline: none;
  text-align: center;
  vertical-align: middle;
  line-height: 12px;
`

export const Button = styled.button`
  padding: 8px;
  min-width: 80px;
  height: 32px;
  text-align: center;
  border-color: ${color.primary};
  border-width: 1px;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  background-color: ${(props) => props.color || color.white};
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.8px;
  margin: 16px 0 0 16px;
  color: ${(props) => (props.color ? color.white : props.color)};
  cursor: pointer;
`
