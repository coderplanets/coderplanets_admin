/*
 *
 * ThreadEditor
 *
 */
import React from 'react'

import { buildLog, connectStore } from '@utils'

import { FormInputer, Icon, Button, StatusBox, Space } from '@components'
import { Wrapper, Divider, ActionBtns } from './styles'

import { useInit, inputOnChange, cancleEdit, mutateConfirm } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:ThreadEditor')
/* eslint-enable no-unused-vars */

const ThreadEditorContainer = ({ threadEditor }) => {
  useInit(threadEditor)

  const {
    editThreadData,
    mutating,
    success,
    error,
    warn,
    statusMsg,
    // isEdit,
  } = threadEditor

  return (
    <Wrapper>
      coderplanets
      <h2>添加 Thread </h2>
      <Divider />
      <FormInputer
        label="名称:"
        value={editThreadData.title}
        onChange={inputOnChange.bind(this, 'title')}
      />
      <FormInputer
        label="raw:"
        value={editThreadData.raw}
        onChange={inputOnChange.bind(this, 'raw')}
        note="用作 router 的唯一值，只能用英文。建议用Thread的 translate 作为 raw 值， 比如 'posts'版块， 对应的 raw 值为 'posts'"
      />
      <FormInputer
        label="索引:"
        type="number"
        value={editThreadData.index}
        onChange={inputOnChange.bind(this, 'index')}
      />
      <StatusBox success={success} error={error} warn={warn} msg={statusMsg} />
      <Divider />
      <ActionBtns>
        <Button type="primary" ghost onClick={cancleEdit}>
          取消
        </Button>
        <Space right="20px" />
        {mutating ? (
          <Button type="primary" disabled>
            <Icon type="loading" /> 保存中
          </Button>
        ) : (
          <Button type="primary" onClick={mutateConfirm}>
            保存
          </Button>
        )}
      </ActionBtns>
    </Wrapper>
  )
}

export default connectStore(ThreadEditorContainer)
