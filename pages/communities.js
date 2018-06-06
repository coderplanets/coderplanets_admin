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
import CommunitiesBanner from '../containers/CommunitiesBanner'
import CommunitiesContent from '../containers/CommunitiesContent'

import sidebarSchema from '../containers/Sidebar/schema'

import { Global, /* queryStringToJSON, */ mergeRouteQuery } from '../utils'
import Footer from '../components/Footer'

// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

export default class Index extends React.Component {
  // static async getInitialProps({ req, pathname, asPath }) {
  static async getInitialProps({ req, query }) {
    /* const isServer = !!req */
    /* if (!isServer) return {} */
    /* const test = '/communities/?page=2&size=20' */
    /* console.log('mergeRouteQuery --> test ---> ', queryStringToJSON(test)) */

    /* console.log('mergeRouteQuery --> bb ---> ', queryStringToJSON(asPath)) */
    console.log('mergeRouteQuery --> cc ---> ', mergeRouteQuery(query))

    const data = await request(GRAPHQL_ENDPOINT, sidebarSchema.communitiesRaw, {
      /* filter: queryStringToJSON(asPath), */
      filter: mergeRouteQuery(query),
      /* filter: { page: 2, size: 20 }, */
    })

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
      communities: data.pagedCommunities,
      communitiesContent: { pagedCommunities: data.pagedCommunities },
      /* communitiesContent: { pagedCommunities: {} }, */
    }
  }

  constructor(props) {
    super(props)
    this.store = initRootStore({ ...props })
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
                <CommunitiesBanner />
                <CommunitiesContent />
                <Footer />
              </BodyLayout>
            </MultiLanguage>
          </ThemeWrapper>
        </GAWraper>
      </Provider>
    )
  }
}
