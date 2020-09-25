import * as React from 'react'
import color from '../../utils/color'

const Close = (): JSX.Element => {
  return (
    <svg viewBox='0 0 224.512 224.512' width={16} height={16}>
      <path
        fill={color.dark}
        d='M224.507 6.997L217.521 0 112.256 105.258 6.998 0 .005 6.997l105.258 105.257L.005 217.512l6.993 7L112.256 119.24l105.265 105.272 6.986-7-105.258-105.258z'
      />
    </svg>
  )
}

export default Close
