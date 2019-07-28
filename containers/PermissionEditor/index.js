/*
 *
 * PermissionEditor
 *
 */

import React from 'react'

import { buildLog, connectStore } from '@utils'

import { UserCell, Button, Space, Icon } from '@components'

import CommunityList from './CommunityList'
import PermissionList from './PermissionList'

import { Wrapper, Divider, ActionBtns } from './styles'
import { useInit, onCancle, confirm } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:PermissionEditor')
/* eslint-enable no-unused-vars */

const PermissionEditorContainer = ({ permissionEditor, editData }) => {
  useInit(permissionEditor)

  const {
    pagedCommunitiesData,
    allRulesData,
    curView,
    curCommunityRaw,
    selectRulesData,
  } = permissionEditor

  const user = editData.data
  const { cmsPassportString } = user
  const mutating = false

  return (
    <Wrapper>
      <UserCell user={user} small />
      <h2>权限编辑</h2>
      <Divider />

      <CommunityList
        data={pagedCommunitiesData}
        userRules={cmsPassportString}
        allRules={allRulesData.cms.community}
        activeRaw={curCommunityRaw}
      />
      <Divider />

      <PermissionList
        data={cmsPassportString}
        selectRules={selectRulesData}
        allRules={allRulesData.cms}
        curView={curView}
        activeRaw={curCommunityRaw}
      />
      <Divider />
      <ActionBtns>
        <Button type="primary" ghost onClick={onCancle}>
          取消
        </Button>
        <Space right="20px" />
        {mutating ? (
          <Button type="primary" disabled>
            <Icon type="loading" /> 保存中
          </Button>
        ) : (
          <Button type="primary" onClick={confirm.bind(this, user.id)}>
            保存
          </Button>
        )}
      </ActionBtns>
    </Wrapper>
  )
}

export default connectStore(PermissionEditorContainer)
