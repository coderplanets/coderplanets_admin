/*
 * render the icon based on suggestion type
 *
 */

import React from 'react'
import R from 'ramda'

import { DEFAULT_ICON } from 'config/assets'

import { themeCoverMap, NON_FILL_COMMUNITY } from '@utils'
import {
  Wrapper,
  ThemeIconWrapper,
  Icon,
  DoraemonIcon,
  ThemeDot,
} from './styles/suggest_icon'
// const log = buildLog('C:Doraemon:NodeIcon')

const SuggestIcon = ({ round, suggestion: { raw, logo, cmd } }) => {
  /* const lowerRaw = R.toLower(raw) */
  if (cmd === 'theme') {
    return (
      <ThemeIconWrapper>
        <ThemeDot bg={themeCoverMap[raw]} />
      </ThemeIconWrapper>
    )
  }
  // doraemon cat icon, it's smaller then normal icons
  if (raw === 'doraemon_help') {
    return (
      <Wrapper>
        <DoraemonIcon src={logo} />
      </Wrapper>
    )
  }
  // normal icons
  return (
    <React.Fragment>
      {logo ? (
        <Wrapper>
          <Icon
            round={round}
            src={logo || DEFAULT_ICON}
            nonFill={R.contains(raw, NON_FILL_COMMUNITY)}
          />
        </Wrapper>
      ) : null}
    </React.Fragment>
  )
}

export default SuggestIcon
