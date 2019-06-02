import React from 'react'
import { Provider } from 'mobx-react'
/* import { request } from 'graphql-request' */
/* import { GRAPHQL_ENDPOINT } from '@config' */

import initRootStore from 'stores/init'
import { GAWraper, Footer } from '@components'

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
} from 'containers'

import { P } from 'containers/schemas'

import {
  makeGQClient,
  // queryStringToJSON,
  // getMainPath,
  // getSubPath,
  // extractThreadFromPath,
  // subPath2Thread,
  // TYPE,
  BStore,
  // nilOrEmpty,
} from '@utils'

// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

async function fetchData(props) {
  const token = BStore.cookie.from_req(props.req, 'jwtToken')
  const gqClient = makeGQClient(token)
  // const userHasLogin = nilOrEmpty(token) === false

  // const { asPath } = props
  // schema

  // utils
  // const community = getMainPath(props)
  // const thread = extractThreadFromPath(props)
  // const filter = { ...queryStringToJSON(asPath, { pagi: 'number' }), community }

  const pagedCommunities = gqClient.request(P.pagedCommunities, {
    filter: { page: 1, size: 30 },
    userHasLogin: false,
  })

  return {
    ...(await pagedCommunities),
  }
}

export default class Index extends React.Component {
  // static async getInitialProps({ req, pathname, asPath }) {
  static async getInitialProps(props) {
    /* const isServer = !!req */

    console.log('## -index ## page ..')
    const { pagedCommunities } = await fetchData(props)

    // console.log('communities ->> ', pagedCommunities)

    return {
      // version: store.version,
      // messages,
      // locale,
      langSetup: {},
      communities: pagedCommunities,
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
