/*
 *
 * ContentsCountCell
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog } from '@utils'
import { Wrapper, Content, Label, Count } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:ContentsCountCell:index')
/* eslint-enable no-unused-vars */

const ContentsCountCell = ({
  data: { postsCount, jobsCount, videosCount, reposCount },
}) => {
  return (
    <Wrapper>
      <Content empty={postsCount === 0}>
        <Label>帖子:</Label>{' '}
        <Count empty={postsCount === 0}>{postsCount}</Count>
      </Content>
      <Content empty={jobsCount === 0}>
        <Label>招聘:</Label> <Count empty={jobsCount === 0}>{jobsCount}</Count>
      </Content>
      <Content empty={videosCount === 0}>
        <Label>视频:</Label>{' '}
        <Count empty={videosCount === 0}>{videosCount}</Count>
      </Content>
      <Content empty={reposCount === 0}>
        <Label>项目:</Label>{' '}
        <Count empty={reposCount === 0}>{reposCount}</Count>
      </Content>
    </Wrapper>
  )
}

ContentsCountCell.propTypes = {
  data: T.shape({
    postsCount: T.number,
    jobsCount: T.number,
    videosCount: T.number,
    reposCount: T.number,
  }),
}

ContentsCountCell.defaultProps = {
  data: {
    postsCount: 0,
    jobsCount: 0,
    videosCount: 0,
    reposCount: 0,
  },
}

export default React.memo(ContentsCountCell)
