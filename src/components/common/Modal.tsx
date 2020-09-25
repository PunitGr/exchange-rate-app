import React from 'react'
import styled from 'styled-components'

import Portal from './Portal'
import CloseIcon from '../Icons/Close'
import color from '../../utils/color'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const ModalContent = styled.div`
  max-width: 400px;
  width: 100%;
  opacity: 1;
  height: auto;
  background-color: ${color.white};
  padding: 24px;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  box-shadow: 0 2px 11px 0 rgba(5, 5, 5, 0.2);

  @media (max-width: 768px) {
    width: 80%;
  }
`

const CloseButton = styled.a`
  text-decoration: none;
  outline: none;
  align-self: flex-end;
  cursor: pointer;
`

interface Props {
  isVisible: boolean
  onToggle: () => void
  children: React.ReactNode
}

const Modal = (props: Props): JSX.Element | null => {
  if (!props.isVisible) {
    return null
  }

  return (
    <Portal>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={props.onToggle} data-testid='close'>
            <CloseIcon />
          </CloseButton>
          {props.children}
        </ModalContent>
      </ModalContainer>
    </Portal>
  )
}

export default Modal
