import React from 'react'

import CommunityMenuItem from './CommunityMenuItem'
import CommunitiesRootMenuItem from './CommunitiesRootMenuItem'
import UsersRootMenuItem from './UsersRootMenuItem'

import { MenuItem } from './styles/menu'

import { uid } from '../../utils'

const MenuList = ({ items, activeRaw, activeThread }) => (
  <MenuItem>
    <CommunitiesRootMenuItem
      activeRaw={activeRaw}
      activeThread={activeThread}
    />
    <UsersRootMenuItem activeRaw={activeRaw} activeThread={activeThread} />

    {items.map(item => (
      <CommunityMenuItem
        key={uid.gen()}
        item={item}
        activeRaw={activeRaw}
        activeThread={activeThread}
      />
    ))}
  </MenuItem>
)

export default MenuList
