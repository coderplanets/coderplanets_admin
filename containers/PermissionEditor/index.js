/*
 *
 * PermissionEditor
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import R from 'ramda'
import ReactTooltip from 'react-tooltip'

import { ICON_CMD } from '../../config'

import {
  UserCell,
  Button,
  Space,
  Icon,
  CommunityMatrix,
} from '../../components'

import {
  Wrapper,
  Divider,
  PermissionWrapper,
  PerItem,
  PerTitle,
  CheckIcon,
  ActionBtns,
} from './styles'

import {
  uid,
  makeDebugger,
  storePlug,
  isEmptyNil,
  isObject,
  maybe,
  mapKey,
  mapValue,
  objToArray,
} from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:PermissionEditor')
/* eslint-enable no-unused-vars */

const valueIsObj = v => isObject(v)
const valueIsNotObj = R.complement(valueIsObj)

const getManagedCommunitiesRaws = userRules => {
  const userRulesByCommunities = R.filter(valueIsObj, JSON.parse(userRules))
  const ckeys = R.keys(userRulesByCommunities)

  return ckeys
}

const CommunitiesMatrix = ({ data, userRules, activeRaw }) => {
  if (!data) return <div />
  userRules = isEmptyNil(userRules) ? '{}' : userRules

  const managerdRaws = getManagedCommunitiesRaws(userRules)

  return (
    <CommunityMatrix
      data={data}
      onSelect={logic.communitySelect}
      onAddOnSelect={logic.communityAddOnSelect}
      activeRaw={activeRaw}
      lens={managerdRaws}
    />
  )
}

const CheckMark = ({ active }) => {
  return <CheckIcon src={`${ICON_CMD}/check.svg`} active={active} />
}

const getJson = value => {
  return isEmptyNil(value) ? {} : JSON.parse(value)
}

const getCurUserRules = (data, curView, activeRaw) => {
  const userPermissions = JSON.parse(data)
  const userRulesByCommunities = R.filter(valueIsObj, userPermissions)

  if (curView === 'general') {
    return R.pickBy(valueIsNotObj, userPermissions)
  }

  return maybe(userRulesByCommunities[activeRaw], {})
}

const PermissionList = ({
  data,
  allRules,
  selectRules,
  curView,
  activeRaw,
}) => {
  data = isEmptyNil(data) ? '{}' : data

  const curUserRules = getCurUserRules(data, curView, activeRaw)
  const selectGeneralRules = R.filter(valueIsNotObj, selectRules)
  const selectCommunityRules = R.filter(valueIsObj, selectRules)

  const curAllRules =
    curView === 'general'
      ? getJson(allRules.general)
      : getJson(allRules.community)

  const curSelectRules =
    curView === 'general' ? selectGeneralRules : selectCommunityRules[activeRaw]

  const curActiveRules = R.merge(curUserRules, curSelectRules)
  const ruleArray = objToArray(R.merge(curAllRules, curActiveRules))

  return (
    <PermissionWrapper>
      <React.Fragment>
        {ruleArray.map(p => (
          <PerItem key={uid.gen()} onClick={logic.onRuleClick.bind(this, p)}>
            <PerTitle>{mapKey(p)}</PerTitle> <CheckMark active={mapValue(p)} />
          </PerItem>
        ))}
      </React.Fragment>
    </PermissionWrapper>
  )
}

class PermissionEditorContainer extends React.Component {
  componentWillMount() {
    const { permissionEditor } = this.props
    logic.init(permissionEditor)
  }

  componentDidMount() {
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

        <CommunitiesMatrix
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
        <br />
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
