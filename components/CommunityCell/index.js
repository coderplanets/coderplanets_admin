/*
 *
 * CommunityCell
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'

import shortid from 'shortid'

import ReactTooltip from 'react-tooltip'
import { makeDebugger } from '../../utils'
import { Wrapper, Logo, Title } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:CommunityCell:index')
/* eslint-enable no-unused-vars */

const tooltipOffset = JSON.stringify({ top: 1 })

const renderContent = (data, array) => {
  if (!R.isEmpty(data)) {
    return (
      <Wrapper>
        <Logo src={data.logo} />
        <Title>{data.title}</Title>
      </Wrapper>
    )
  } else if (!R.isEmpty(array)) {
    return (
      <Wrapper>
        {array.map(c => (
          <Wrapper key={shortid.generate()}>
            <div
              data-tip={c.title}
              data-for="community_cell"
              data-offset={tooltipOffset}
            >
              <Logo src={c.logo} />
            </div>
          </Wrapper>
        ))}
      </Wrapper>
    )
  }
  return <div />
}

// TODO: array version && tooltip
const CommunityCell = ({ data, array }) => (
  <div>
    {renderContent(data, array)}
    <ReactTooltip effect="solid" place="bottom" id="community_cell" />
  </div>
)

CommunityCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  data: PropTypes.shape({
    id: PropTypes.string,
    logo: PropTypes.string,
    title: PropTypes.string,
  }),

  array: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string,
      title: PropTypes.string,
    })
  ),
}

CommunityCell.defaultProps = {
  array: [],
  data: {},
}

export default CommunityCell
