/*
 *
 * NotFound
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { ICON_ASSETS, ISSUE_ADDR } from '../../config'
import { makeDebugger } from '../../utils'

import {
  Icon404,
  Wrapper,
  Icon,
  Text,
  Title,
  DescWrapper,
  IssueLink,
  Desc,
} from './styles'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:NotFound:index')
/* eslint-enable no-unused-vars */

const DefaultDesc = () => (
  <div>
    <div>
      如果你发现是网站的问题，恳请你<IssueLink
        href={ISSUE_ADDR}
        rel="noopener noreferrer"
        target="_blank"
      >
        提交issue
      </IssueLink>，以便于开发者在第一时间修复。
    </div>
  </div>
)

const NotFound = ({ msg, desc }) => {
  return (
    <Wrapper>
      <Icon>
        <Icon404 path={`${ICON_ASSETS}/404/nofound1.svg`} />
      </Icon>
      <Text>
        <Title>{msg}</Title>
        <DescWrapper>
          {R.isEmpty(desc) ? <DefaultDesc /> : <Desc>{desc}</Desc>}
        </DescWrapper>
      </Text>
    </Wrapper>
  )
}

NotFound.propTypes = {
  // https://www.npmjs.com/package/prop-types
  msg: PropTypes.string,
  desc: PropTypes.string,
}

NotFound.defaultProps = {
  msg: '哦豁! 你所期待的内容没有找到 ...',
  desc: '',
}

// 如果你发现是网站的问题，恳请你在这里提交
export default NotFound