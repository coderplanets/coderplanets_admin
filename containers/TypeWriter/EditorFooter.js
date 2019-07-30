import React from 'react'
// import R from 'ramda'

import { ICON_CMD } from '@config'
import { THREAD } from '@constant'
import { FileUploader, Maybe } from '@components'

import { Labeler } from '..'

import {
  Wrapper,
  Item,
  ItemTitle,
  ItemIcon,
  Divider,
} from './styles/editor_footer'

import { insertCode, onUploadImageDone } from './logic'

const CodeInputer = ({ divider }) => (
  <React.Fragment>
    <Maybe data={!divider}>
      <Divider src={`${ICON_CMD}/more.svg`} />
    </Maybe>
    <Item onClick={insertCode}>
      <ItemIcon src={`${ICON_CMD}/extra_code.svg`} />
      <ItemTitle>代码</ItemTitle>
    </Item>
  </React.Fragment>
)

const PicUploader = ({ divider }) => (
  <React.Fragment>
    <Maybe data={!divider}>
      <Divider src={`${ICON_CMD}/more.svg`} />
    </Maybe>
    <FileUploader onUploadDone={onUploadImageDone}>
      <Item>
        <ItemIcon src={`${ICON_CMD}/extra_image.svg`} />
        <ItemTitle>图片</ItemTitle>
      </Item>
    </FileUploader>
  </React.Fragment>
)

const EditorFooter = ({ thread }) => {
  switch (thread) {
    case THREAD.JOB: {
      return (
        <Wrapper>
          <Labeler label="城市" iconSrc={`${ICON_CMD}/city_map.svg`} />
          <Divider src={`${ICON_CMD}/more.svg`} />
          <Labeler label="薪资" iconSrc={`${ICON_CMD}/money_yuan.svg`} />
          <PicUploader />
        </Wrapper>
      )
    }
    default: {
      return (
        <Wrapper>
          <Labeler />
          <CodeInputer divider />
          <PicUploader divider />
        </Wrapper>
      )
    }
  }
}

export default EditorFooter

/*
   <Item>
   <ItemIcon src={`${ICON_CMD}/extra_vote.svg`} />
   <ItemTitle>投票</ItemTitle>
   </Item>
   <Item>
   <ItemIcon src={`${ICON_CMD}/extra_setting.svg`} />
   <ItemTitle>设置</ItemTitle>
   </Item>
 */
