import React from 'react'
import T from 'prop-types'
import Masonry from 'react-masonry-component'
import R from 'ramda'
import { withTheme } from 'styled-components'

// import Loading, { Rect, Circle } from 'react-content-loader'
import ContentLoader from 'react-content-loader'

import { uid, buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const debug = buildLog('c:LoadingEffects:index')
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
const LoadingBlock = ({ theme }) => (
  /* eslint-enable no-unused-vars */

  <div style={{ width: '45%', overflow: 'hidden', marginTop: 20, height: 180 }}>
    <ContentLoader
      height={200}
      width={280}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
      <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
      <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
      <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
      <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
      <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
      <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
      <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
    </ContentLoader>
  </div>
)

const CheatSheetLoading = ({ column, theme }) => (
  <Masonry>
    {R.range(0, column).map(() => (
      <LoadingBlock key={uid.gen()} theme={theme} />
    ))}
  </Masonry>
)

CheatSheetLoading.propTypes = {
  column: T.number,
  /* theme: T.object, */
}

CheatSheetLoading.defaultProps = {
  column: 4,
}

export default withTheme(CheatSheetLoading)
