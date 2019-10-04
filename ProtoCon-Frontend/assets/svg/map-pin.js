import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const MapPinSvg = props => (
  <Svg width={20} height={24}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="translate(1 1)"
    >
      <Path d="M18 9c0 7-9 13-9 13S0 16 0 9a9 9 0 0 1 18 0z" />
      <Circle cx={9} cy={9} r={3} />
    </G>
  </Svg>
)

export default MapPinSvg
