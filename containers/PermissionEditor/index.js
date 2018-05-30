/*
 *
 * PermissionEditor
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import shortid from 'shortid'
import R from 'ramda'
import ReactTooltip from 'react-tooltip'

import { ICON_ASSETS } from '../../config'

import {
  makeDebugger,
  storePlug,
  isEmptyNil,
  isObject,
  maybe,
  objToArray,
} from '../../utils'

import { UserCell, Button, Space, Icon } from '../../components'

import {
  Wrapper,
  MatrixWrapper,
  CommunityLogo,
  GeneralPLogo,
  Divider,
  PermissionWrapper,
  PerItem,
  PerTitle,
  CheckIcon,
  ActionBtns,
} from './styles'

import * as logic from './logic'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:PermissionEditor')
/* eslint-enable no-unused-vars */

const valueIsObj = v => isObject(v)
const valueIsNotObj = R.complement(valueIsObj)

// TODO: move to utils
const mapKey = R.compose(R.head, R.keys)
const mapValue = R.compose(R.head, R.values)

const tooltipOffset = JSON.stringify({ top: 5, right: -5 })

const getManagedCommunitiesRaws = userRules => {
  const userRulesByCommunities = R.filter(valueIsObj, JSON.parse(userRules))
  const ckeys = R.keys(userRulesByCommunities)

  return ckeys
}

const CommunityMatrix = ({ data, userRules, activeRaw }) => {
  if (!data) return <div />

  const managerdRaws = getManagedCommunitiesRaws(userRules)

  return (
    <MatrixWrapper>
      {data.entries.map(c => (
        <div
          key={shortid.generate()}
          onClick={logic.communitySelect.bind(this, c.raw)}
          data-place="right"
          data-tip={c.title}
          data-for="permission_editor"
          data-offset={tooltipOffset}
        >
          <CommunityLogo
            src={c.logo}
            len={R.contains(c.raw, managerdRaws)}
            active={c.raw === activeRaw}
          />
        </div>
      ))}
      <div
        data-place="right"
        data-tip="基础权限"
        data-for="permission_editor"
        data-offset={tooltipOffset}
        onClick={logic.communitySelect.bind(this, 'general')}
      >
        <GeneralPLogo src={`${ICON_ASSETS}/cmd/all.svg`} />
      </div>
    </MatrixWrapper>
  )
}

const CheckMark = ({ active }) => {
  return <CheckIcon src={`${ICON_ASSETS}/cmd/check.svg`} active={active} />
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

const PermissionList = ({ data, allRules, curView, activeRaw }) => {
  if (isEmptyNil(data)) {
    return <div />
  }

  const curUserRules = getCurUserRules(data, curView, activeRaw)

  const curAllRules =
    curView === 'general'
      ? getJson(allRules.general)
      : getJson(allRules.community)

  const dataArray = objToArray(R.merge(curAllRules, curUserRules))

  return (
    <PermissionWrapper>
      <React.Fragment>
        {dataArray.map(p => (
          <PerItem key={shortid.generate()}>
            <PerTitle>{mapKey(p)}</PerTitle> <CheckMark active={mapValue(p)} />
          </PerItem>
        ))}
      </React.Fragment>
    </PermissionWrapper>
  )
}

class PermissionEditorContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.permissionEditor)
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
    } = permissionEditor

    const user = editData.data
    const { cmsPassportString } = user
    const mutating = false

    return (
      <Wrapper>
        <UserCell user={user} small />
        <h2>权限编辑</h2>
        <Divider />
        <CommunityMatrix
          data={pagedCommunitiesData}
          userRules={cmsPassportString}
          allRules={allRulesData.cms.community}
          activeRaw={curCommunityRaw}
        />
        <Divider />
        <PermissionList
          data={cmsPassportString}
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
          <Button type="primary" ghost onClick={debug}>
            取消
          </Button>
          <Space right="20px" />
          {mutating ? (
            <Button type="primary" disabled>
              <Icon type="loading" /> 保存中
            </Button>
          ) : (
            <Button type="primary" onClick={debug}>
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
