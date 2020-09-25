import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'

import Modal from '../Modal'

describe('<Modal />', () => {
  const toggleModal = jest.fn()

  beforeEach(() => {
    render(
      <Modal isVisible onToggle={toggleModal}>
        <div>Hello</div>
      </Modal>
    )
  })

  it('renders the children', () => {
    expect(screen.findByText('Hello')).toBeTruthy()
  })

  it('should call toggleModal on clicking close', () => {
    const element = screen.getByTestId('close')
    fireEvent.click(element)
    expect(toggleModal).toHaveBeenCalledTimes(1)
  })
})

test('portal should be empty', () => {
  const toggleModal = jest.fn()

  render(
    <Modal isVisible={false} onToggle={toggleModal}>
      <div>Hello</div>
    </Modal>
  )

  const portal = screen.getByTestId('exchange-portal-el')
  expect(portal.innerHTML).toBe('')
})
