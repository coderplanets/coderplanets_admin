/*
 *
 * CommunitySetter
 *
 */

import React from 'react'
import R from 'ramda'
import { inject, observer } from 'mobx-react'

import { Pagi } from '../../components'

import {
  Wrapper,
  Divider,
  CategoryWrapper,
  CategoryTag,
  CommunityLogo,
  SetterTitle,
} from './styles'

import { uid, makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitySetter')
/* eslint-enable no-unused-vars */

const CommunitiesList = ({ thread, source, communities, selectedids }) => (
  <CategoryWrapper>
    {communities.map(c => (
      <CategoryTag
        key={uid.gen()}
        active={R.contains(c.id, selectedids)}
        onClick={logic.setCommunity.bind(this, thread, source.id, c.id)}
      >
        <CommunityLogo src={c.logo} />
        {c.title}
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

class CommunitySetterContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitySetter)
  }

  render() {
    const { communitySetter, editData } = this.props
    const { pagedCommunitiesData } = communitySetter
    const { thread } = editData

    const source = editData.data
    const selectedids = R.pluck('id', source.communities)

    return (
      <Wrapper>
        <SetterTitle>{source.title}</SetterTitle>
        <h2>设置社区</h2>
        <Divider />
        {pagedCommunitiesData ? (
          <React.Fragment>
            <CommunitiesList
              thread={thread}
              source={source}
              communities={pagedCommunitiesData.entries}
              selectedids={selectedids}
            />
            <Divider />
            <div>
              <Pagi
                pageNumber={pagedCommunitiesData.pageNumber}
                pageSize={pagedCommunitiesData.pageSize}
                totalCount={pagedCommunitiesData.totalCount}
                onChange={logic.getAllCommunities}
              />
            </div>
          </React.Fragment>
        ) : (
          <div />
        )}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitySetter'))(
  observer(CommunitySetterContainer)
)
