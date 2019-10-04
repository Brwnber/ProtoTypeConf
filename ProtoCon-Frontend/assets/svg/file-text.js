import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const FileTextSvg = props => (
  <Svg width={18} height={22}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M11 1H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-6-6z" />
      <Path d="M11 1v6h6m-4 5H5m8 4H5m2-8H5" />
    </G>
  </Svg>
)

export default FileTextSvg
