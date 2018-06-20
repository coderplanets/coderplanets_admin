/*
 *
 * ThreadSetter
 *
 */

import React from 'react'
import R from 'ramda'
import { inject, observer } from 'mobx-react'
import shortid from 'shortid'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

import { Wrapper, Divider, ThreadsWrapper, ThreadTag } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:ThreadSetter')
/* eslint-enable no-unused-vars */

const ThreadsList = ({ communityId, threads, selectedids }) => {
  return (
    <ThreadsWrapper>
      {threads.map(c => (
        <ThreadTag
          key={shortid.generate()}
          active={R.contains(c.id, selectedids)}
          onClick={logic.onAdd.bind(this, communityId, c.id, selectedids)}
        >
          {c.title}
        </ThreadTag>
      ))}
    </ThreadsWrapper>
  )
}

class ThreadSetterContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.threadSetter)
  }

  render() {
    const { threadSetter, editData } = this.props
    const { pagedThreadsData } = threadSetter

    debug('pagedThreads ... > ', pagedThreadsData)
    const selectedids = R.pluck('id', editData.threads)
    debug('selectedCids: ', selectedids)

    return (
      <Wrapper>
        coderplanets
        <h2>设置社区Thread</h2>
        <Divider />
        {pagedThreadsData ? (
          <ThreadsList
            communityId={editData.id}
            threads={pagedThreadsData.entries}
            selectedids={selectedids}
          />
        ) : null}
      </Wrapper>
    )
  }
}

export default inject(storePlug('threadSetter'))(
  observer(ThreadSetterContainer)
)
