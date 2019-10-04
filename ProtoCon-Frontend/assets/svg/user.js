import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const UserSvg = props => (
  <Svg width={18} height={20}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="translate(1 1)"
    >
      <Path d="M16 18v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2" />
      <Circle cx={8} cy={4} r={4} />
    </G>
  </Svg>
)

export default UserSvg
