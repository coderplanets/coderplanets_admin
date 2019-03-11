/*
 *
 * PermissionEditor
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import ReactTooltip from 'react-tooltip'

import { UserCell, Button, Space, Icon } from 'components'

import { makeDebugger, storePlug } from 'utils'
import { Wrapper, Divider, ActionBtns } from './styles'

import CommunityList from './CommunityList'
import PermissionList from './PermissionList'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:PermissionEditor')
/* eslint-enable no-unused-vars */

class PermissionEditorContainer extends React.Component {
  componentDidMount() {
    const { permissionEditor } = this.props
    logic.init(permissionEditor)

    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 1000)
  }

  render() {
    const { permissionEditor, editData } = this.props
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
        <ReactTooltip
          effect="solid"
          place="bottom"
          id="permission_editor"
          delayShow={1000}
        />
        <Divider />
        <ActionBtns>
          <Button type="primary" ghost onClick={logic.onCancle}>
            取消
          </Button>
          <Space right="20px" />
          {mutating ? (
            <Button type="primary" disabled>
              <Icon type="loading" /> 保存中
            </Button>
          ) : (
            <Button type="primary" onClick={logic.confirm.bind(this, user.id)}>
              保存
            </Button>
          )}
        </ActionBtns>
      </Wrapper>
    )
  }
}

export default inject(storePlug('permissionEditor'))(
  observer(PermissionEditorContainer)
)
