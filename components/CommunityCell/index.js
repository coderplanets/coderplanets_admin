/*
 *
 * CommunityCell
 *
 */

import React from 'react'
import R from 'ramda'
import T from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { ICON_CMD } from '@config'

import { uid, buildLog } from '@utils'
import AdderCell from '../AdderCell'
import CommunitiesLogoList from './CommunitiesLogoList'

import {
  Wrapper,
  CommunityLogo,
  Title,
  SetterWrapper,
  DeleteCross,
  UnknowText,
  AddIcon,
} from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:CommunityCell:index')
/* eslint-enable no-unused-vars */

const SingleCommunity = ({ community }) => (
  <Wrapper>
    <CommunityLogo src={community.logo} />
    <Title>{community.title}</Title>
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
  }
  if (withSetter && !R.isEmpty(array)) {
    return (
      <Wrapper>
        <CommunitiesSetter
          array={array}
          source={source}
          thread={thread}
          onDelete={onDelete}
        />
        <div onClick={onAdd.bind(this, thread, source)}>
          <AddIcon src={`${ICON_CMD}/plus.svg`} />
        </div>
      </Wrapper>
    )
  }
  if (!R.isEmpty(array)) {
    return (
      <Wrapper>
        <CommunitiesLogoList array={array} />
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
  data: T.shape({
    id: T.string,
    logo: T.string,
    title: T.string,
  }),

  array: T.arrayOf(
    T.shape({
      logo: T.string,
      title: T.string,
    })
  ),
  withSetter: T.bool,
  thread: T.string,
  source: T.object,
  onDelete: T.func,
  onAdd: T.func,
  /* eslint-enable */
}

CommunityCell.defaultProps = {
  array: [],
  data: {},
  thread: 'POST',
  withSetter: false,
  source: {},
  onDelete: log,
  onAdd: log,
}

export default CommunityCell
