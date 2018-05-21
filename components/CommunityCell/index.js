/*
 *
 * CommunityCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { makeDebugger } from '../../utils'
import { Wrapper, Logo, Title } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:CommunityCell:index')
/* eslint-enable no-unused-vars */

// TODO: array version
const CommunityCell = ({ data }) => (
  <Wrapper>
    <Logo src={data.logo} />
    <Title>{data.title}</Title>
  </Wrapper>
)

CommunityCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

CommunityCell.defaultProps = {}

export default CommunityCell
