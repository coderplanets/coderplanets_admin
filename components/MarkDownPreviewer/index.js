/*
 *
 * MarkDownPreviewer
 *
 */
import React from 'react'
import T from 'prop-types'

import Remarkable from 'remarkable'
import remarkableemoj from 'remarkable-emoji'
import mentionsPlugin from 'remarkable-mentions'
import Prism from 'mastani-codehighlight'

import MarkDownStyle from '@containers/ThemeWrapper/MarkDownStyle'
import { MENTION_USER_ADDR } from '@config'
import { buildLog } from '@utils'

import { PreviewerContainer } from './styles'

const md = new Remarkable()
md.use(mentionsPlugin({ url: MENTION_USER_ADDR }))
md.use(remarkableemoj)

/* eslint-disable no-unused-vars */
const debug = buildLog('c:MarkDownPreviewer:index')
/* eslint-enable no-unused-vars */

// TODO: move it to components
class MarkDownPreviewer extends React.Component {
  componentDidMount() {
    Prism.highlightAll()
  }

  render() {
    const { body } = this.props

    return (
      <PreviewerContainer>
        <MarkDownStyle>
          <div className="markdown-body">
            <div
              id="typewriter-preview-container"
              dangerouslySetInnerHTML={{
                __html: md.render(body),
              }}
            />
          </div>
        </MarkDownStyle>
      </PreviewerContainer>
    )
  }
}

// TODO default props check

MarkDownPreviewer.propTypes = {
  // https://www.npmjs.com/package/prop-types
  body: T.string,
}

MarkDownPreviewer.defaultProps = {
  body: '',
}

export default MarkDownPreviewer
