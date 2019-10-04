import React from 'react'
import Svg, { Path } from 'react-native-svg'

const BookmarkSvg = props => (
  <Svg width={16} height={20}>
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 19l-7-5-7 5V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
    />
  </Svg>
)

export default BookmarkSvg
