/*
 *
 * ThreadEditor
 *
 */
import React from 'react'
import { inject, observer } from 'mobx-react'
// import { InputNumer } from 'antd'

import { FormInputer, Icon, Button, StatusBox, Space } from 'components'

import { makeDebugger, storePlug } from 'utils'
import { Wrapper, Divider, ActionBtns } from './styles'

import * as logic from './logic'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:ThreadEditor')
/* eslint-enable no-unused-vars */

class ThreadEditorContainer extends React.Component {
  componentDidMount() {
    const { threadEditor } = this.props
    logic.init(threadEditor)
  }

  render() {
    const { threadEditor } = this.props
    const {
      editThreadData,
      mutating,
      success,
      error,
      warn,
      statusMsg,
      // isEdit,
    } = threadEditor

    console.log('editThreadData --> ', editThreadData)
    return (
      <Wrapper>
        coderplanets
        <h2>添加 Thread </h2>
        <Divider />
        <FormInputer
          label="名称:"
          value={editThreadData.title}
          onChange={logic.inputOnChange.bind(this, 'title')}
        />
        <FormInputer
          label="raw:"
          value={editThreadData.raw}
          onChange={logic.inputOnChange.bind(this, 'raw')}
          note="用作 router 的唯一值，只能用英文。建议用Thread的 translate 作为 raw 值， 比如 'posts'版块， 对应的 raw 值为 'posts'"
        />
        <FormInputer
          label="索引:"
          type="number"
          value={editThreadData.index}
          onChange={logic.inputOnChange.bind(this, 'index')}
        />
        <StatusBox
          success={success}
          error={error}
          warn={warn}
          msg={statusMsg}
        />
        <Divider />
        <ActionBtns>
          <Button type="primary" ghost onClick={logic.cancleEdit}>
            取消
          </Button>
          <Space right="20px" />
          {mutating ? (
            <Button type="primary" disabled>
              <Icon type="loading" /> 保存中
            </Button>
          ) : (
            <Button type="primary" onClick={logic.mutateConfirm}>
              保存
            </Button>
          )}
        </ActionBtns>
      </Wrapper>
    )
  }
}

export default inject(storePlug('threadEditor'))(
  observer(ThreadEditorContainer)
)
