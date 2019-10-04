import React from 'react'
import Svg, { Path } from 'react-native-svg'

const CheckSvg = props => (
  <Svg width={18} height={13}>
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 1L6 12 1 7"
    />
  </Svg>
)

export default CheckSvg
