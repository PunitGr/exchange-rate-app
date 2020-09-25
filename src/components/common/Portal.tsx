import React from 'react'
import {createPortal} from 'react-dom'

interface Props {
  children: React.ReactNode
}

const Portal = (props: Props): React.ReactPortal => {
  const id = 'exchange-portal-el'
  let portalEl = document.getElementById(id)

  if (!portalEl) {
    portalEl = document.createElement('div')
    portalEl.setAttribute('id', id)
    portalEl.setAttribute('data-testid', id)
    document.body.appendChild(portalEl)
  }

  return createPortal(props.children, portalEl)
}

export default Portal
