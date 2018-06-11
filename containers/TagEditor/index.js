/*
 *
 * TagEditor
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import { CMS_THREADS } from '../../config'

import {
  Button,
  Icon,
  Space,
  FormItem,
  FormInputer,
  FormSelector,
  TagColorSelector,
  CommunityMatrix,
} from '../../components'
import { Wrapper, ActionBtns, Divider } from './styles'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:TagEditor')
/* eslint-enable no-unused-vars */

class TagEditorContainer extends React.Component {
  componentWillMount() {
    const { tagEditor, editData } = this.props
    logic.init(tagEditor, editData)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { tagEditor } = this.props
    const { mutating, tagData, pagedCommunitiesData, isEdit } = tagEditor

    const showStyle = isEdit ? { display: 'none' } : { display: 'block' }

    return (
      <Wrapper>
        coderplanets
        <h2>
          {isEdit ? '编辑' : '创建'}
          标签
        </h2>
        <Divider />
        <FormInputer
          label="名称:"
          value={tagData.title}
          onChange={logic.profileChange('title')}
        />
        <TagColorSelector
          label="颜色:"
          value={tagData.color}
          onChange={logic.colorChange}
        />
        <div style={showStyle}>
          <FormItem label="社区:">
            <CommunityMatrix
              data={pagedCommunitiesData}
              onSelect={logic.communityChange}
              activeRaw={tagData.community ? tagData.community.raw : ''}
              hasAddon={false}
            />
          </FormItem>
        </div>
        <div style={showStyle}>
          <FormSelector
            label="thread:"
            options={CMS_THREADS}
            value={tagData.thread}
            onChange={logic.threadChange}
          />
        </div>
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

export default inject(storePlug('tagEditor'))(observer(TagEditorContainer))
