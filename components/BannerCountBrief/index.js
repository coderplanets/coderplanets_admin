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

const CountBrief = ({ curCount, totalCount, part, unit }) => {
  if (totalCount === curCount) {
    return (
      <Result>
        <ResultBottom>
          <ResultText>当前共有{part}</ResultText>
          <ResultNumber>{totalCount} </ResultNumber>
          <ResultText>{unit}</ResultText>
        </ResultBottom>
      </Result>
    )
  } else if (curCount < 0 && totalCount === 0) {
    return <Result>正在加载, 请稍后...</Result>
  }
  return (
    <Result>
      <ResultTop>
        {part}总数为 {totalCount} {unit}
      </ResultTop>
      <ResultBottom>
        <ResultText>符合当前条件的{part}</ResultText>
        <ResultNumber>{curCount} </ResultNumber>
        <ResultText>
          {unit}, 占比 {toPercentNum(curCount, totalCount)}
        </ResultText>
      </ResultBottom>
    </Result>
  )
}

const BannerCountBrief = ({ curCount, totalCount, part, unit }) => (
  <CountBrief
    curCount={curCount}
    totalCount={totalCount}
    part={part}
    unit={unit}
  />
)

BannerCountBrief.propTypes = {
  curCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  unit: PropTypes.string,
  part: PropTypes.string,
}

BannerCountBrief.defaultProps = {
  part: '帖子',
  unit: '篇',
}

export default BannerCountBrief
