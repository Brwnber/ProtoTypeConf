import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const EditSvg = props => (
  <Svg width={22} height={22}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M10 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="M17.5 1.5a2.121 2.121 0 0 1 3 3L11 14l-4 1 1-4 9.5-9.5z" />
    </G>
  </Svg>
)

export default EditSvg
