import React from 'react'
import { Provider } from 'mobx-react'
/* import { request } from 'graphql-request' */
/* import { GRAPHQL_ENDPOINT } from '../config' */

import initRootStore from '../stores'
import { GAWraper, Footer } from '../components'

import {
  Header,
  Banner,
  Content,
  ThemeWrapper,
  MultiLanguage,
  Sidebar,
  Preview,
  Doraemon,
  Route,
  BodyLayout,
} from '../containers'

/* import sidebarSchema from '../containers/Sidebar/schema' */
import { Global } from '../utils'

// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

export default class Index extends React.Component {
  // static async getInitialProps({ req, pathname, asPath }) {
  static async getInitialProps({ req }) {
    /* const isServer = !!req */

    console.log('## index ## page ..')
    /* console.log('-------> isServer(index) -----> ', isServer) */
    /* console.log('-------> pathname(index) -----> ', pathname) */
    /* return {} */
    /* const isServer = !!req */
    // console.log('getInitialProps pathname ---> ', pathname)
    // console.log('getInitialProps asPath ---> ', asPath)
    /* const data = await request(GRAPHQL_ENDPOINT, sidebarSchema.communitiesRaw, { */
    /* filter: { page: 1, size: 30 }, */
    /* }) // .then(data => console.log(data)) */
    /* console.log('SSR getInitialProps index ------> ', data.communities) */
    /* eslint-disable */
    const { locale, messages } = req || Global.__NEXT_DATA__.props
    /* eslint-enable */
    const langSetup = {}
    langSetup[locale] = messages

    return {
      // version: store.version,
      // messages,
      // locale,
      langSetup,
      communities: {},
    }
  }

  constructor(props) {
    super(props)
    this.store = initRootStore({
      langSetup: props.langSetup,
      communities: {},
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <GAWraper>
          <ThemeWrapper>
            <Route />
            <MultiLanguage>
              <Sidebar />
              <Preview />
              <Doraemon />
              <BodyLayout>
                <Header />
                <Banner />
                <Content />
                <Footer />
              </BodyLayout>
            </MultiLanguage>
          </ThemeWrapper>
        </GAWraper>
      </Provider>
    )
  }
}
