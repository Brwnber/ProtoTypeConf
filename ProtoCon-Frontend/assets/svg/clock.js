import React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'

const ClockSvg = props => (
  <Svg width={22} height={22}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="translate(1 1)"
    >
      <Circle cx={10} cy={10} r={10} />
      <Path d="M10 4v6l4 2" />
    </G>
  </Svg>
)

export default ClockSvg
