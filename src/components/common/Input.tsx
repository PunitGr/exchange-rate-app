import styled from 'styled-components'
import color from '../../utils/color'

const Input = styled.input`
  text-align: right;
  min-width: 34px;
  width: auto;
  height: 32px;
  font-size: 18px;
  border: 0;
  border-bottom: 1px solid #111;
  outline: none;
  padding: 2px;
  background-color: transparent;
  border-color: #111;
  align-self: flex-end;

  @media (max-width: 768px) {
    font-size: 16px;
    width: 70%;
  }

  &:focus {
    border-color: ${color.primary};
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default Input
