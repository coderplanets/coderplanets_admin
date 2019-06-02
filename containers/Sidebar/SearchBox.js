import React from 'react'

import { ICON_CMD } from '@config'

import { Wrapper, SearchLogo, Inputer } from './styles/search_box'
import { searchOnChange } from './logic'

const SearchBox = ({ value }) => (
  <Wrapper>
    <SearchLogo src={`${ICON_CMD}/search2.svg`} />
    <Inputer value={value} onChange={searchOnChange} />
  </Wrapper>
)

export default SearchBox
