import React from 'react'
import { Provider } from 'mobx-react'
import R from 'ramda'

import GAWraper from '../components/GAWraper'
import initRootStore from '../stores/init'
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

import {
  makeGQClient,
  // Global,
  // queryStringToJSON,
  /* mergeRouteQuery */
  getMainPath,
  getSubPath,
  BStore,
  ssrPagedSchema,
  ssrPagedContents,
} from '../utils'
import Footer from '../components/Footer'

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

  const subpath = getSubPath(props)
  console.log('subpath --> ', subpath)

  // const sessionState = gqClient.request(P.sessionState)
  const pagedContents = gqClient.request(ssrPagedSchema(subpath), {
    filter: { page: 1, size: 30 },
  })

  return {
    ...(await pagedContents),
  }
}

/* filter: mergeRouteQuery(query), */
export default class Index extends React.Component {
  static async getInitialProps(props) {
    // const isServer = !!req
    // if (!isServer) return {}

    console.log('## communities ## index page ..')
    const subPath = getSubPath(props)
    const mainPath = getMainPath(props)

    let resp
    try {
      resp = await fetchData(props)
    } catch ({ response: { errors } }) {
      /*
      if (ssrAmbulance.hasLoginError(errors)) {
        resp = await fetchData(props, { realname: false })
      } else {
        return { statusCode: 404, target: subPath }
      }
      */
      return { statusCode: 404, target: subPath }
    }

    // const { pagedCommunities } = resp
    const pagedContents = ssrPagedContents(mainPath, subPath, resp)

    return R.merge({ route: { mainPath, subPath } }, pagedContents)
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
