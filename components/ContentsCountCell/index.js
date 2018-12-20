/*
 *
 * ContentsCountCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Content, Label, Count } from './styles'

import { makeDebugger } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:ContentsCountCell:index')
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
  data: PropTypes.shape({
    postsCount: PropTypes.number,
    jobsCount: PropTypes.number,
    videosCount: PropTypes.number,
    reposCount: PropTypes.number,
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
