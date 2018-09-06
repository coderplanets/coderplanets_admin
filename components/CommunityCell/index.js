/*
 *
 * CommunityCell
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { ICON_ASSETS } from '../../config'
import { AdderCell } from '../../components'

import {
  Wrapper,
  CommunityLogo,
  Title,
  SetterWrapper,
  DeleteCross,
  UnknowText,
  AddIcon,
} from './styles'

import { uid, makeDebugger } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:CommunityCell:index')
/* eslint-enable no-unused-vars */

const tooltipOffset = JSON.stringify({ top: 1 })

const SingleCommunity = ({ community }) => (
  <Wrapper>
    <CommunityLogo src={community.logo} />
    <Title>{community.title}</Title>
  </Wrapper>
)

const CommunitiesLogoArray = ({ array }) => (
  <Wrapper>
    {array.map(c => (
      <Wrapper key={uid.gen()}>
        <div
          data-tip={c.title}
          data-for="community_cell"
          data-offset={tooltipOffset}
        >
          <CommunityLogo src={c.logo} />
        </div>
      </Wrapper>
    ))}
  </Wrapper>
)

const CommunitiesSetter = ({ array, source, thread, onDelete }) => (
  <Wrapper>
    {array.map(c => (
      <SetterWrapper key={uid.gen()}>
        <CommunityLogo src={c.logo} />
        <DeleteCross onClick={onDelete.bind(this, thread, source, c.id)}>
          x
        </DeleteCross>
      </SetterWrapper>
    ))}
  </Wrapper>
)

// TODO: move args to props
const renderContent = props => {
  const { data, array, withSetter, source, thread, onAdd, onDelete } = props
  if (!R.isEmpty(data)) {
    return <SingleCommunity community={data} />
  } else if (withSetter && !R.isEmpty(array)) {
    return (
      <Wrapper>
        <CommunitiesSetter
          array={array}
          source={source}
          thread={thread}
          onDelete={onDelete}
        />
        <div onClick={onAdd.bind(this, thread, source)}>
          <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
        </div>
      </Wrapper>
    )
  } else if (!R.isEmpty(array)) {
    return (
      <Wrapper>
        <CommunitiesLogoArray array={array} />
      </Wrapper>
    )
  }

  return (
    <React.Fragment>
      {withSetter ? (
        <AdderCell onAdd={onAdd.bind(this, thread, source)} />
      ) : (
        <UnknowText>漂浮中</UnknowText>
      )}
    </React.Fragment>
  )
}

// TODO: array version && tooltip
const CommunityCell = props => (
  <React.Fragment>
    {renderContent(props)}
    <ReactTooltip effect="solid" place="bottom" id="community_cell" />
  </React.Fragment>
)

CommunityCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  /* eslint-disable */
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
  withSetter: PropTypes.bool,
  thread: PropTypes.string,
  source: PropTypes.object,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  /* eslint-enable */
}

CommunityCell.defaultProps = {
  array: [],
  data: {},
  thread: 'POST',
  withSetter: false,
  source: {},
  onDelete: debug,
  onAdd: debug,
}

export default CommunityCell
