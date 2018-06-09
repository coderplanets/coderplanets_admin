/*
 *
 * BannerCountBrief
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { makeDebugger, toPercentNum } from '../../utils'

import {
  Result,
  ResultTop,
  ResultBottom,
  ResultNumber,
  ResultText,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:BannerCountBrief:index')
/* eslint-enable no-unused-vars */

const CountBrief = ({ filteredCount, totalCount, thread, unit }) => {
  if (filteredCount === null || totalCount === filteredCount) {
    return (
      <Result>
        <ResultBottom>
          <ResultText>当前共有{thread}</ResultText>
          <ResultNumber>{totalCount} </ResultNumber>
          <ResultText>{unit}</ResultText>
        </ResultBottom>
      </Result>
    )
  } else if (filteredCount < 0 && totalCount === 0) {
    return <Result>正在加载, 请稍后...</Result>
  }
  return (
    <Result>
      <ResultTop>
        {thread}总数为 {totalCount} {unit}
      </ResultTop>
      <ResultBottom>
        <ResultText>符合当前条件的{thread}</ResultText>
        <ResultNumber>{filteredCount} </ResultNumber>
        <ResultText>
          {unit}, 占比 {toPercentNum(filteredCount, totalCount)}
        </ResultText>
      </ResultBottom>
    </Result>
  )
}

const BannerCountBrief = ({ filteredCount, totalCount, thread, unit }) => (
  <CountBrief
    filteredCount={filteredCount}
    totalCount={totalCount}
    thread={thread}
    unit={unit}
  />
)

BannerCountBrief.propTypes = {
  filteredCount: PropTypes.number,
  totalCount: PropTypes.number.isRequired,
  unit: PropTypes.string,
  thread: PropTypes.string,
}

BannerCountBrief.defaultProps = {
  filteredCount: null,
  thread: '帖子',
  unit: '篇',
}

export default BannerCountBrief
