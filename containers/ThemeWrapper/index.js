/*
 * make children compoent cound reach the props.theme object
 * because mobx's observer mechanism, we should manually watch the theme
 * otherwhise the render will not be triggled
*/

import React from 'react'
import { inject, observer } from 'mobx-react'
import { ThemeProvider } from 'styled-components'

import { storePlug } from '@utils'

import AntOverWrite from './AntOverWrite'
// import MarkDownStyle from './MarkDownStyle'
import CodeHighlight from './CodeHighlight'
import GlobalStyle from './GlobalStyle'

// TODO: mv MarkDownStyle && CodeHighlight to it's own container

const ThemeObserver = ({ children, theme }) => (
  <ThemeProvider theme={theme.themeData}>
    <React.Fragment>
      <div>{children}</div>
      <AntOverWrite />
      <CodeHighlight />
      <GlobalStyle />
    </React.Fragment>
  </ThemeProvider>
)

export default inject(storePlug('theme'))(observer(ThemeObserver))
