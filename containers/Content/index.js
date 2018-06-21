/*
 *
 * Content
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'
import { CommunityContent, CommunitiesContent } from '../../containers'

import { makeDebugger, storePlug, ROUTE } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Content')
/* eslint-enable no-unused-vars */

const DomainContent = ({ curRoute }) => {
  switch (curRoute.mainPath) {
    case ROUTE.COMMUNITIES: {
      return <CommunitiesContent />
    }
    default: {
      return <CommunityContent />
    }
  }
}

/*
   NOTE: this container is only used for dev mode
   for some unkown reasion, pages/index will always be the entry in dev mode
 */
class ContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.content)
  }

  render() {
    const { curRoute } = this.props.content

    return <DomainContent curRoute={curRoute} />
  }
}

export default inject(storePlug('content'))(observer(ContentContainer))
