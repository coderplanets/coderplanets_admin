import React from 'react'

import { uid } from 'utils'
import CommunityMenuItem from './CommunityMenuItem'
import CommunitiesRootMenuItem from './CommunitiesRootMenuItem'
import UsersRootMenuItem from './UsersRootMenuItem'

import { MenuItem } from './styles/menu'

const MenuList = ({
  items,
  activeRaw,
  activeThread,
  rootCountStatusData,
  activeCommunityData,
  countsInfo,
}) => (
  <MenuItem>
    <CommunitiesRootMenuItem
      activeRaw={activeRaw}
      activeThread={activeThread}
      countsInfo={rootCountStatusData}
    />
    <UsersRootMenuItem
      activeRaw={activeRaw}
      community={activeCommunityData}
      activeThread={activeThread}
      countsInfo={countsInfo}
    />

    {items.map(item => (
      <CommunityMenuItem
        key={uid.gen()}
        item={item}
        community={activeCommunityData}
        activeRaw={activeRaw}
        activeThread={activeThread}
        countsInfo={countsInfo}
      />
    ))}
  </MenuItem>
)

export default MenuList
