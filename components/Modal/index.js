/*
 *
 * Modal
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog } from '@utils'
import { ICON_CMD } from '@config'
import { Mask, Wrapper, CloseBtn, ChildrenWrapper } from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:Modal:index')
/* eslint-enable no-unused-vars */

const Modal = ({ children, show, width, showCloseBtn, onClose }) => (
  <Mask show={show} onClick={onClose}>
    <Wrapper width={width}>
      <CloseBtn
        src={`${ICON_CMD}/closeBtn.svg`}
        show={showCloseBtn}
        onClick={onClose}
      />
      <ChildrenWrapper onClick={e => e.stopPropagation()}>
        {children}
      </ChildrenWrapper>
    </Wrapper>
  </Mask>
)

Modal.propTypes = {
  // https://www.npmjs.com/package/prop-types
  children: T.node.isRequired,
  show: T.bool,
  onClose: T.func,
  width: T.string,
  showCloseBtn: T.bool,
}

Modal.defaultProps = {
  show: false,
  onClose: log,
  width: '600px',
  showCloseBtn: false,
}

export default Modal
