import React from 'react'
import ReactSVG from 'react-svg'
import styled from 'styled-components'

import { ICON_ASSETS } from '../../config'
import { Animate } from '../../utils'

const LoadingWrapper = styled.div`
  margin-top: 20vh;
`
const LoadingIcon = styled(ReactSVG)`
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
    <LoadingIcon path={`${ICON_ASSETS}/cmd/rainbow_logo.svg`} />
    <LoadingText>... 漫威的编辑真心可以 ...</LoadingText>
  </LoadingWrapper>
)

const TLoading = loading => ({
  size: 'large',
  delay: 1000,
  spinning: loading,
  indicator: <TableLoading />,
})

export default TLoading
