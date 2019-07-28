/*
 *
 * CommunityEditor
 *
 */

import React from 'react'

import { buildLog, connectStore } from '@utils'

import {
  Button,
  Icon,
  FormInputer,
  Space,
  FileUploader,
  StatusBox,
} from '@components'

// TODO: EditableImage
import { Wrapper, Logo, Divider, ActionBtns, ImageWrapper } from './styles'
import {
  useInit,
  profileChange,
  cancleEdit,
  mutateConfirm,
  uploadPic,
} from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:CommunityEditor')
/* eslint-enable no-unused-vars */

const CommunityEditorContainer = ({ communityEditor, editData }) => {
  useInit(communityEditor, editData)

  const {
    communityData,
    mutating,
    success,
    error,
    warn,
    statusMsg,
    isEdit,
  } = communityEditor

  return (
    <Wrapper>
      coderplanets
      <h2>
        {isEdit ? '编辑' : '创建'}
        社区
      </h2>
      <Divider />
      <div>
        {communityData.logo ? (
          <FileUploader
            onUploadDone={uploadPic}
            dir="communities"
            nestDir={false}
          >
            <Logo src={communityData.logo} />
          </FileUploader>
        ) : (
          <FileUploader
            onUploadDone={uploadPic}
            dir="communities"
            nestDir={false}
          >
            <ImageWrapper>
              <Icon type="plus" />
            </ImageWrapper>
          </FileUploader>
        )}
      </div>
      <FormInputer
        label="名称:"
        value={communityData.title}
        onChange={profileChange('title')}
      />
      <FormInputer
        label="raw:"
        value={communityData.raw}
        note="用作 router 的唯一值，只能用英文。建议用社区的 translate 作为 raw 值， 比如 'javascript 中文社区'， 对应的 raw 值为 'javascript'"
        onChange={profileChange('raw')}
      />
      <FormInputer
        label="描述:"
        textarea
        value={communityData.desc}
        onChange={profileChange('desc')}
      />
      <br />
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

export default connectStore(CommunityEditorContainer)
