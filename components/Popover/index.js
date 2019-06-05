/*
 *
 * Popover
 *
 */

import React from 'react'
import { Popover } from 'antd'
import T from 'prop-types'

import { buildLog } from '@utils'
import { ContentContainer } from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:Popover:index')
/* eslint-enable no-unused-vars */

const renderContent = content => {
  return <ContentContainer>{content}</ContentContainer>
}

const PopoverComponent = ({ title, children, content, trigger, placement }) => (
  <Popover
    content={renderContent(content)}
    placement={placement}
    title={title}
    trigger={trigger}
  >
    {children}
  </Popover>
)

PopoverComponent.propTypes = {
  children: T.node.isRequired,
  content: T.node.isRequired,
  title: T.string,
  trigger: T.oneOf(['hover', 'click', 'focus']),
  placement: T.oneOf(['bottomLeft', 'bottom', 'right']),
}

PopoverComponent.defaultProps = {
  title: '',
  trigger: 'hover',
  placement: 'bottom',
}

export default PopoverComponent
