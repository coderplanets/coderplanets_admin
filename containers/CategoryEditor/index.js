/*
 *
 * CategoryEditor
 *
 */

import React from 'react'

import { buildLog, connectStore } from '@utils'

import { Button, Icon, Space, FormInputer } from '@components'
import { Wrapper, ActionBtns, Divider } from './styles'
import { useInit, profileChange, cancleMutate, mutateConfirm } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:CategoryEditor')
/* eslint-enable no-unused-vars */

const CategoryEditorContainer = ({ categoryEditor, editData }) => {
  useInit(categoryEditor, editData)

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
        onChange={profileChange('title')}
        note="一个分类可包含多个社区，同时，一个社区可属于多个分类"
      />
      <FormInputer
        label="raw:"
        value={categoryData.raw}
        onChange={profileChange('raw')}
        note="必须是英文，用于 route 以及国际化"
      />
      <Divider />
      <ActionBtns>
        <Button type="primary" ghost onClick={cancleMutate}>
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

export default connectStore(CategoryEditorContainer)
