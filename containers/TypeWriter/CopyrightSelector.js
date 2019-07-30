import React from 'react'
import R from 'ramda'
// import T from 'prop-types'

import { ICON_CMD } from '@config'
import { THREAD } from '@constant'
import { uid } from '@utils'

import { Popover } from '@components'

import {
  Wrapper,
  Selector,
  CheckIcon,
  CheckText,
  ReprintIcon,
  ReprintWrapper,
  CopyRightText,
  MoreIcon,
} from './styles/copyright_selector'

import { copyrightChange } from './logic'

const FullOptions = [
  {
    title: '原创',
    value: 'original',
  },
  {
    title: '转载',
    value: 'reprint',
  },
  {
    title: '翻译',
    value: 'translate',
  },
]

const getOptions = thread => {
  switch (thread) {
    case THREAD.JOB: {
      return R.reject(o => o.value === 'translate', FullOptions)
    }
    default:
      return FullOptions
  }
}

const getCpTitle = cptype =>
  R.path(['title'], R.find(R.propEq('value', cptype), FullOptions))

const CopyrightContent = ({ active, thread }) => (
  <Wrapper>
    {getOptions(thread).map(opt => (
      <Selector key={uid.gen()} onClick={copyrightChange.bind(this, opt.value)}>
        <CheckIcon
          src={`${ICON_CMD}/check2.svg`}
          active={active === opt.value}
        />
        <CheckText>{opt.title}</CheckText>
      </Selector>
    ))}
  </Wrapper>
)

const CopyrightSelector = ({ cpType, thread }) => (
  <Popover
    content={<CopyrightContent active={cpType} thread={thread} />}
    placement="right"
    trigger="hover"
  >
    <ReprintWrapper>
      <ReprintIcon src={`${ICON_CMD}/${cpType}.svg`} />
      <CopyRightText>{getCpTitle(cpType)}</CopyRightText>
      <MoreIcon src={`${ICON_CMD}/more.svg`} />
    </ReprintWrapper>
  </Popover>
)

export default CopyrightSelector
