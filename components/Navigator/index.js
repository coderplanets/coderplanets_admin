/*
 *
 * Navigator
 *
 */

import React from 'react'
// import T from 'prop-types'

import { ICON_CMD } from '@config'
import { buildLog } from '@utils'
import { Breadcrumbs, Logo, LogoText, BetaLogo } from './style'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:Navigator:index')
/* eslint-enable no-unused-vars */

const Navigator = () => (
  <Breadcrumbs>
    <Logo src={`${ICON_CMD}/rainbow_logo.svg`} />
    <LogoText>coderplanets</LogoText>
    <BetaLogo src={`${ICON_CMD}/beta.svg`} />
  </Breadcrumbs>
)

/*
Navigator.propTypes = {
  // https://www.npmjs.com/package/prop-types
}

Navigator.defaultProps = {}
*/

export default Navigator
