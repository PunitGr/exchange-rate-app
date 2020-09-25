import styled from 'styled-components'

type Direction = 'column' | 'row' | 'row-reverse' | 'column-reverse'
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

interface Props {
  justify?: JustifyContent
  width?: string
  direction?: Direction
}

const Flex = styled.div`
  display: flex;
  justify-content: ${(props: Props) => props.justify || 'unset'};
  width: ${(props: Props) => props.width || 'unset'};
  flex-direction: ${(props: Props) => props.direction || 'unset'};
`

export default Flex
