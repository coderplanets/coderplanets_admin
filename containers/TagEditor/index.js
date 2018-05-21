/*
 *
 * TagEditor
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import { CMS_PARTS } from '../../config'

import {
  Button,
  Icon,
  Space,
  FormInputer,
  FormSelector,
  TagColorSelector,
} from '../../components'
import { Wrapper, ActionBtns, Divider } from './styles'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:TagEditor')
/* eslint-enable no-unused-vars */

class TagEditorContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.tagEditor)
  }

  render() {
    const { tagEditor } = this.props
    const { mutating, tagData } = tagEditor
    console.log('options --> ', CMS_PARTS)

    return (
      <Wrapper>
        coderplanets
        <h2>创建标签</h2>
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
        <FormInputer label="社区:" onChange={debug} />
        <FormSelector
          label="part:"
          options={CMS_PARTS}
          value={tagData.part}
          onChange={logic.partChange}
        />
        <Divider />
        <ActionBtns>
          <Button type="primary" ghost onClick={debug}>
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
