/*
*
* BodyLayout
*
*/

import React from 'react'
import T from 'prop-types'
import { inject, observer } from 'mobx-react'

import { storePlug } from '@utils'

import Body from './styles'
import * as logic from './logic'

class BodyLayoutContainer extends React.Component {
  componentDidMount() {
    const { bodylayout } = this.props
    logic.init(bodylayout)
  }

  render() {
    const { bodylayout, children } = this.props
    const { sidebarPin } = bodylayout

    return <Body sidebarPin={sidebarPin}>{children}</Body>
  }
}

BodyLayoutContainer.propTypes = {
  children: T.arrayOf(T.element),
  bodylayout: T.object.isRequired,
}

BodyLayoutContainer.defaultProps = {
  children: <div />,
}

export default inject(storePlug('bodylayout'))(observer(BodyLayoutContainer))
