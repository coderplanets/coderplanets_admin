/*
 *
 * AccountViewer
 *
 */

import React from 'react'
import R from 'ramda'
import ReactTooltip from 'react-tooltip'

import { buildLog, connectStore } from '@utils'

import { ThemeSelector, UserBrief, Maybe } from '@components'
import SiteSocial from './SiteSocial'
import Planets from './Planets'
import ContributeMap from './ContributeMap'
import { AccountWrapper, AccountContent, ThemeWrapper, Divider } from './styles'

import { useInit, changeTheme, editProfile, onLogout } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:AccountViewer')
/* eslint-enable no-unused-vars */

const ThemeSection = ({ curTheme }) => (
  <ThemeWrapper>
    <ThemeSelector curTheme={curTheme} changeTheme={changeTheme} />
  </ThemeWrapper>
)

const AccountViewerContainer = ({ accountViewer, user }) => {
  useInit(accountViewer, user)

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
              onEdit={editProfile}
              onLogout={onLogout}
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

export default connectStore(AccountViewerContainer)
