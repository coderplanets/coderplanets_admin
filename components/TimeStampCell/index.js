/*
 *
 * TimeStampCell
 *
 */

import React from 'react'
import T from 'prop-types'
import TimeAgo from 'timeago-react'

import { buildLog } from '@utils'
import { Wrapper, Content, Label, Count } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:TimeStampCell:index')
/* eslint-enable no-unused-vars */

const TimeStampCell = ({ data: { insertedAt, updatedAt } }) => (
  <Wrapper>
    <Content>
      <Label>创建 /</Label>
      <Count same>
        <TimeAgo datetime={insertedAt} locale="zh_CN" />
      </Count>
    </Content>
    <Content>
      <Label>更新 /</Label>
      <Count same={insertedAt === updatedAt}>
        <TimeAgo datetime={updatedAt} locale="zh_CN" />
      </Count>
    </Content>
  </Wrapper>
)

TimeStampCell.propTypes = {
  data: T.shape({
    insertedAt: T.string,
    updatedAt: T.string,
  }),
}

TimeStampCell.defaultProps = {
  data: {
    insertedAt: '',
    updatedAt: '',
  },
}

export default React.memo(TimeStampCell)
