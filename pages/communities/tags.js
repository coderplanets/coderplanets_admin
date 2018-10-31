import React from 'react'
import { Provider } from 'mobx-react'

import GAWraper from '../../components/GAWraper'
import initRootStore from '../../stores/init'
import ThemeWrapper from '../../containers/ThemeWrapper'
import MultiLanguage from '../../containers/MultiLanguage'
import Sidebar from '../../containers/Sidebar'
import Preview from '../../containers/Preview'
import Doraemon from '../../containers/Doraemon'
import Route from '../../containers/Route'
import BodyLayout from '../../containers/BodyLayout'
import Header from '../../containers/Header'
import CommunitiesBanner from '../../containers/CommunitiesBanner'
import CommunitiesContent from '../../containers/CommunitiesContent'

import { P } from '../../containers/schemas'

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
} from '../../utils'

import Footer from '../../components/Footer'

// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

async function fetchData(props) {
  const token = BStore.cookie.from_req(props.req, 'jwtToken')
  const gqClient = makeGQClient(token)

  const pagedTags = gqClient.request(P.pagedTags, {
    filter: { page: 1, size: 30 },
  })

  return {
    ...(await pagedTags),
  }
}

export default class Index extends React.Component {
  static async getInitialProps(props) {
    // const isServer = !!req
    // if (!isServer) return {}

    const { pagedTags } = await fetchData(props)

    return {
      communitiesContent: { pagedTags },
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
