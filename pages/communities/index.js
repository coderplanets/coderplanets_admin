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
  // Global,
  // queryStringToJSON,
  /* mergeRouteQuery */
  // getSubPath,
  BStore,
} from '../../utils'
import Footer from '../../components/Footer'

// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

/*
   this function is only needed in dev-mode, it's a bug
   in production, the query for sub-path will go direactly to sub-route file

   这个函数的存在是 dev 模式下的 bug, 生产环境下是不需要（不起作用的）的，生产环境下会
   直接被路由到子文件
 */
async function fetchData(props) {
  const token = BStore.cookie.from_req(props.req, 'jwtToken')
  const gqClient = makeGQClient(token)

  const pagedCommunities = gqClient.request(P.pagedCommunities, {
    filter: { page: 1, size: 30 },
  })

  return {
    ...(await pagedCommunities),
  }
}

/* filter: mergeRouteQuery(query), */
export default class Index extends React.Component {
  static async getInitialProps(props) {
    // const isServer = !!req
    // if (!isServer) return {}

    console.log('## communities ## index page ..')

    const { pagedCommunities } = await fetchData(props)

    return {
      // version: store.version,
      // messages,
      // locale,
      communities: pagedCommunities,
      communitiesContent: { pagedCommunities },
      communitiesBanner: { totalCount: pagedCommunities.totalCount },
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
