/*
 *
 * AccountEditor
 *
 */

import React from 'react'

import { ICON_CMD } from '@config'
import { buildLog, connectStore } from '@utils'

import { Input, Button, Icon, StatusBox } from '@components'
import {
  Wrapper,
  BackIcon,
  AvatarPic,
  SexLable,
  FormItemWrapper,
  FormLable,
  FormInput,
  SexInput,
  Divider,
  ActionBtns,
  Dude,
  Girl,
  DudeIcon,
  GirlIcon,
} from './styles'

import {
  useInit,
  sexChange,
  profileChange,
  cancleEdit,
  updateConfirm,
} from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:AccountEditor')
/* eslint-enable no-unused-vars */

const { TextArea } = Input

const Avatar = ({ src }) => (
  <div>
    <AvatarPic src={src} />
  </div>
)

const SexItem = ({ label, value }) => (
  <FormItemWrapper>
    <SexLable>{label}</SexLable>
    <SexInput>
      <Dude onClick={sexChange.bind(this, 'dude')}>
        <DudeIcon src={`${ICON_CMD}/dude.svg`} value={value} />
      </Dude>
      <Girl onClick={sexChange.bind(this, 'girl')}>
        <GirlIcon src={`${ICON_CMD}/girl.svg`} value={value} />
      </Girl>
    </SexInput>
  </FormItemWrapper>
)

const FormItem = ({ label, textarea, value, onChange }) => (
  <FormItemWrapper>
    <FormLable>{label}</FormLable>

    <FormInput>
      {textarea ? (
        <TextArea
          value={value}
          placeholder={value}
          autosize={{ minRows: 3, maxRows: 6 }}
          onChange={onChange}
        />
      ) : (
        <Input size="default" value={value} onChange={onChange} />
      )}
    </FormInput>
  </FormItemWrapper>
)

const AccountEditorContainer = ({ accountEditor }) => {
  useInit(accountEditor)

  const {
    accountInfo,
    updating,
    success,
    error,
    warn,
    statusMsg,
  } = accountEditor

  /* log('accountInfo editing->: ', accountInfo) */

  return (
    <Wrapper>
      {/* eslint-disable */}
      <div onClick={logic.goBack}>
        <BackIcon src={`${ICON_CMD}/goback.svg`} />
      </div>
      {/* eslint-enable */}
      <Avatar src={accountInfo.avatar} />
      <FormItem
        label="昵称:"
        value={accountInfo.nickname}
        onChange={profileChange('nickname')}
      />
      <FormItem
        label="邮箱:"
        value={accountInfo.email}
        onChange={profileChange('email')}
      />
      <FormItem
        label="城市:"
        value={accountInfo.location}
        onChange={profileChange('location')}
      />
      <FormItem
        label="公司:"
        value={accountInfo.company}
        onChange={profileChange('company')}
      />
      <FormItem
        label="学校:"
        value={accountInfo.education}
        onChange={profileChange('education')}
      />
      <FormItem
        label="QQ:"
        value={accountInfo.qq}
        onChange={profileChange('qq')}
      />
      <FormItem
        label="微博:"
        value={accountInfo.weibo}
        onChange={profileChange('weibo')}
      />
      <FormItem
        label="微信:"
        value={accountInfo.weichat}
        onChange={profileChange('weichat')}
      />
      <SexItem label="性别:" value={accountInfo.sex} />
      <FormItem
        label="简介:"
        textarea
        value={accountInfo.bio}
        onChange={profileChange('bio')}
      />

      <br />
      <StatusBox success={success} error={error} warn={warn} msg={statusMsg} />

      <Divider />
      <ActionBtns>
        <Button type="primary" ghost onClick={cancleEdit}>
          取消
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {updating ? (
          <Button type="primary" disabled>
            <Icon type="loading" /> 保存中
          </Button>
        ) : (
          <Button type="primary" onClick={updateConfirm}>
            保存
          </Button>
        )}
      </ActionBtns>
    </Wrapper>
  )
}

export default connectStore(AccountEditorContainer)
