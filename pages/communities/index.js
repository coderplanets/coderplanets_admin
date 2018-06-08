import React from 'react'
import { Provider } from 'mobx-react'
import { request } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '../../config'

import GAWraper from '../../components/GAWraper'
import initRootStore from '../../stores'
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

import schema from '../../containers/CommunitiesContent/schema'

import {
  Global,
  queryStringToJSON,
  /* mergeRouteQuery */
  parsePathList,
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
const getSubPath = props => {
  const asPathList = parsePathList(props)

  return asPathList.length > 1 ? asPathList[1] : null
}

/* filter: mergeRouteQuery(query), */
export default class Index extends React.Component {
  static async getInitialProps(props) {
    const { req, asPath } = props
    const isServer = !!req
    if (!isServer) return {}

    let querySchema = schema.pagedCommunitiesRaw
    if (getSubPath(props) === 'tags') {
      querySchema = schema.pagedTagsRaw
    }

    const data = await request(GRAPHQL_ENDPOINT, querySchema, {
      filter: queryStringToJSON(asPath),
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
      communitiesContent: { ...data },
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
