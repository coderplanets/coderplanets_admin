/*
 *
 * ThreadSetter
 *
 */

import React from 'react'
import R from 'ramda'

// import Link from 'next/link'
import { uid, buildLog, connectStore } from '@utils'
import { Wrapper, Divider, ThreadsWrapper, ThreadTag } from './styles'

import { useInit, onAdd } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:ThreadSetter')
/* eslint-enable no-unused-vars */

const ThreadsList = ({ communityId, threads, selectedids }) => (
  <ThreadsWrapper>
    {threads.map(c => (
      <ThreadTag
        key={uid.gen()}
        active={R.contains(c.id, selectedids)}
        onClick={onAdd.bind(this, communityId, c.id, selectedids)}
      >
        {c.title}
      </ThreadTag>
    ))}
  </ThreadsWrapper>
)

const ThreadSetterContainer = ({ threadSetter, editData }) => {
  useInit(threadSetter)

  const { pagedThreadsData } = threadSetter

  log('pagedThreads ... > ', pagedThreadsData)
  const selectedids = R.pluck('id', editData.threads)
  log('selectedCids: ', selectedids)

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

export default connectStore(ThreadSetterContainer)
