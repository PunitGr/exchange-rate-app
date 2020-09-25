import React from 'react'
import {render, screen} from '@testing-library/react'

import Portal from '../Portal'

describe('<Portal />', () => {
  test('portal should render children', () => {
    render(
      <Portal>
        <div>Hello</div>
      </Portal>
    )

    const portal = screen.getByTestId('exchange-portal-el')
    expect(portal.innerHTML).toBe('<div>Hello</div>')
  })
})
