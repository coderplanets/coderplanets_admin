/*
 *
 * CategoryEditor
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import {
  Button,
  Icon,
  Space,
  FormInputer,
  /* FormSelector, */
  /* TagColorSelector, */
} from '@components'
import { makeDebugger, storePlug } from '@utils'

import { Wrapper, ActionBtns, Divider } from './styles'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CategoryEditor')
/* eslint-enable no-unused-vars */

class CategoryEditorContainer extends React.Component {
  componentDidMount() {
    const { categoryEditor, editData } = this.props

    logic.init(categoryEditor, editData)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { categoryEditor } = this.props
    const { mutating, categoryData, isEdit } = categoryEditor

    return (
      <Wrapper>
        coderplanets
        <h2>
          {isEdit ? '编辑' : '创建'}
          社区分类
        </h2>
        <Divider />
        <FormInputer
          label="名称:"
          value={categoryData.title}
          onChange={logic.profileChange('title')}
          note="一个分类可包含多个社区，同时，一个社区可属于多个分类"
        />
        <FormInputer
          label="raw:"
          value={categoryData.raw}
          onChange={logic.profileChange('raw')}
          note="必须是英文，用于 route 以及国际化"
        />
        <Divider />
        <ActionBtns>
          <Button type="primary" ghost onClick={logic.cancleMutate}>
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

export default inject(storePlug('categoryEditor'))(
  observer(CategoryEditorContainer)
)
