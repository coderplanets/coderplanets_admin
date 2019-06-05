/*
 *
 * AccountViewer
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import R from 'ramda'
import ReactTooltip from 'react-tooltip'

import { ThemeSelector, UserBrief, Maybe } from '@components'

import { buildLog, storePlug } from '@utils'
import SiteSocial from './SiteSocial'
import Planets from './Planets'
import ContributeMap from './ContributeMap'

import { AccountWrapper, AccountContent, ThemeWrapper, Divider } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:AccountViewer')
/* eslint-enable no-unused-vars */

const ThemeSection = ({ curTheme }) => (
  <ThemeWrapper>
    <ThemeSelector curTheme={curTheme} changeTheme={logic.changeTheme} />
  </ThemeWrapper>
)

class AccountViewerContainer extends React.Component {
  componentDidMount() {
    const { accountViewer, user } = this.props
    logic.init(accountViewer, user)

    /* force rebuild the tooltip, otherwise it won't work in some async cases */
    /* if you want to custom see: */
    /* https://github.com/wwayne/react-tooltip/blob/2364dc61332aa947b106dd4bbdd1f2b0e4b1e51d/src/index.scss */
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 2000)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { accountViewer } = this.props
    const {
      curTheme,
      viewingType,
      userInfoData,
      subscribedCommunities,
    } = accountViewer

    const { contributes } = userInfoData // accountInfo

    return (
      <AccountWrapper>
        {R.isEmpty(userInfoData.id) ? null : (
          <React.Fragment>
            <ReactTooltip effect="solid" place="bottom" />
            <AccountContent>
              <UserBrief
                user={userInfoData}
                displayStyle="sidebar"
                showEdit
                viewingType={viewingType}
                onEdit={logic.editProfile}
                onLogout={logic.onLogout}
              />

              <Divider top="20px" bottom="0px" />
              <SiteSocial user={userInfoData} />
              <Maybe test={!R.isEmpty(subscribedCommunities)}>
                <React.Fragment>
                  <Divider top="0px" bottom="20px" />
                  <Planets
                    subscribedCommunities={subscribedCommunities}
                    viewingType={viewingType}
                  />
                </React.Fragment>
              </Maybe>
              <Divider top="10px" bottom="20px" />

              <ContributeMap data={contributes} />
            </AccountContent>

            <Maybe test={viewingType === 'account'}>
              <React.Fragment>
                <Divider top="10px" bottom="12px" />
                <ThemeSection curTheme={curTheme} />
              </React.Fragment>
            </Maybe>
          </React.Fragment>
        )}
      </AccountWrapper>
    )
  }
}

export default inject(storePlug('accountViewer'))(
  observer(AccountViewerContainer)
)
