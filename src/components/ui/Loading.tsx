import ClipLoader from 'react-spinners/ClipLoader'
import React from 'react'
import { css } from '@emotion/react'
import type { SerializedStyles } from '@emotion/react'

interface LoadingType {
  loading: boolean
  color?: string
  size?: number
  override?: SerializedStyles
}

const def = css`
  padding: 0;
  margin: 0;
`

const Loading: React.FC<LoadingType> = ({
  loading,
  color = 'gray',
  size = 30,
  override = def,
}) => {
  return <ClipLoader color={color} loading={loading} css={override} size={size} />
}

export default Loading
