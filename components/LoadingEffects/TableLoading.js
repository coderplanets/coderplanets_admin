import React from 'react'
import styled from 'styled-components'

import { Img } from '../../components'

import { ICON_CMD } from '../../config'
import { Animate } from '../../utils'

const LoadingWrapper = styled.div`
  margin-top: 20vh;
`
const LoadingIcon = styled(Img)`
  width: 50px;
  height: 50px;
  opacity: 0.8;
  animation: ${Animate.wobble} 3s infinite;
`

const LoadingText = styled.div`
  margin-top: 10px;
  color: #343545;
  font-size: 1.1rem;
`

const TableLoading = () => (
  <LoadingWrapper>
    <LoadingIcon src={`${ICON_CMD}/rainbow_logo.svg`} />
    <LoadingText>... 漫威的编剧真心可以 ...</LoadingText>
  </LoadingWrapper>
)

const TLoading = loading => ({
  size: 'large',
  delay: 1000,
  spinning: loading,
  indicator: <TableLoading />,
})

export default TLoading
