import React from 'react'
import { Provider } from 'mobx-react'

import { P } from '@schemas'
import { makeGQClient, BStore } from '@utils'

import GAWraper from '@components/GAWraper'
import initRootStore from 'stores/init'
import ThemeWrapper from '@containers/ThemeWrapper'
import MultiLanguage from '@containers/MultiLanguage'
import Sidebar from '@containers/Sidebar'
import Preview from '@containers/Preview'
import Route from '@containers/Route'
import BodyLayout from '@containers/BodyLayout'
import Header from '@containers/Header'

import UsersBanner from '@containers/UsersBanner'
import UsersContent from '@containers/UsersContent'

import Footer from '@components/Footer'
// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

async function fetchData(props) {
  const token = BStore.cookie.from_req(props.req, 'jwtToken')
  const gqClient = makeGQClient(token)
  // const userHasLogin = nilOrEmpty(token) === false

  const pagedUsers = gqClient.request(P.pagedUsers, {
    filter: { page: 1, size: 30 },
  })

  return {
    ...(await pagedUsers),
  }
}

export default class Index extends React.Component {
  // static async getInitialProps({ req, pathname, asPath }) {
  static async getInitialProps(props) {
    /* const isServer = !!req */
    console.log('## communities ## users page ..')
    const { pagedUsers } = await fetchData(props)

    return {
      usersContent: { pagedUsers },
    }
  }

  constructor(props) {
    super(props)
    /* this.store = initRootStore(props.langSetup) */
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
