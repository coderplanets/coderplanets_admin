import React from 'react'

import CommunityMenuItem from './CommunityMenuItem'
import CommunitiesRootMenuItem from './CommunitiesRootMenuItem'
import UsersRootMenuItem from './UsersRootMenuItem'

import { MenuItem } from './styles/menu'

import { uid } from '../../utils'

const MenuList = ({ items, activeRaw, activeThread, countsInfo }) => (
  <MenuItem>
    <CommunitiesRootMenuItem
      activeRaw={activeRaw}
      activeThread={activeThread}
      countsInfo={countsInfo}
    />
    <UsersRootMenuItem
      activeRaw={activeRaw}
      activeThread={activeThread}
      countsInfo={countsInfo}
    />

    {items.map(item => (
      <CommunityMenuItem
        key={uid.gen()}
        item={item}
        activeRaw={activeRaw}
        activeThread={activeThread}
        countsInfo={countsInfo}
      />
    ))}
  </MenuItem>
)

export default MenuList
