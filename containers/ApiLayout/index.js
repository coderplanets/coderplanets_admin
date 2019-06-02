/*
 *
 * ApiLayout
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '@utils'
import Wrapper from './styles'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:ApiLayout')
/* eslint-enable no-unused-vars */

class ApiLayoutContainer extends React.Component {
  componentDidMount() {
    const { apiLayout } = this.props
    logic.init(apiLayout)
  }

  render() {
    const { children } = this.props
    return <Wrapper>{children}</Wrapper>
  }
}

ApiLayoutContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  apiLayout: PropTypes.object.isRequired,
}

ApiLayoutContainer.defaultProps = {
  children: <div />,
}

export default inject(storePlug('apiLayout'))(observer(ApiLayoutContainer))
