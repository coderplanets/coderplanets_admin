import React from 'react'
import { Provider } from 'mobx-react'
import { request } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '../config'

import GAWraper from '../components/GAWraper'
import initRootStore from '../stores'
import ThemeWrapper from '../containers/ThemeWrapper'
import MultiLanguage from '../containers/MultiLanguage'
import Sidebar from '../containers/Sidebar'
import Preview from '../containers/Preview'
import Doraemon from '../containers/Doraemon'
import Route from '../containers/Route'
import BodyLayout from '../containers/BodyLayout'
import Header from '../containers/Header'

import UsersBanner from '../containers/UsersBanner'
import UsersContent from '../containers/UsersContent'

import sidebarSchema from '../containers/Sidebar/schema'

import { Global } from '../utils'
import Footer from '../components/Footer'
// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

export default class Index extends React.Component {
  // static async getInitialProps({ req, pathname, asPath }) {
  static async getInitialProps({ req }) {
    /* const isServer = !!req */
    // console.log('getInitialProps pathname ---> ', pathname)
    // console.log('getInitialProps asPath ---> ', asPath)
    const data = await request(GRAPHQL_ENDPOINT, sidebarSchema.communitiesRaw, {
      filter: { page: 1, size: 30 },
    }) // .then(data => console.log(data))
    // console.log('SSR getInitialProps ------> ', data.communities)
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
      communities: data.communities,
    }
  }

  constructor(props) {
    super(props)
    /* this.store = initRootStore(props.langSetup) */
    this.store = initRootStore({
      langSetup: props.langSetup,
      communities: props.communities,
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
                <UsersBanner />
                <UsersContent />
                <Footer />
              </BodyLayout>
            </MultiLanguage>
          </ThemeWrapper>
        </GAWraper>
      </Provider>
    )
  }
}
