import styled from 'styled-components'

const Select = styled.select`
  width: 72px;
  height: 32px;
  font-size: 18px;
  padding: 2px;
  border: 0;
  outline: none;
  background-color: transparent;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export default Select
