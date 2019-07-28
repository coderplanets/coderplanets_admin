import React from 'react'
import { Provider } from 'mobx-react'
import R from 'ramda'

import GAWraper from '@components/GAWraper'
import initRootStore from 'stores/init'
import ThemeWrapper from '@containers/ThemeWrapper'
import MultiLanguage from '@containers/MultiLanguage'
import Sidebar from '@containers/Sidebar'
import Preview from '@containers/Preview'
import Route from '@containers/Route'
import BodyLayout from '@containers/BodyLayout'
import Header from '@containers/Header'
import CommunityBanner from '@containers/CommunityBanner'
import CommunityContent from '@containers/CommunityContent'

import { P } from '@schemas'

import Footer from '@components/Footer'
import {
  makeGQClient,
  getMainPath,
  getSubPath,
  BStore,
  ssrPagedSchema,
  ssrCommunityFilter,
  ssrPagedContents,
} from '@utils'

// try to fix safari bug
// see https://github.com/yahoo/react-intl/issues/422
global.Intl = require('intl')

/*
   this function is only needed in dev-mode, it's a bug
   in production, the query for sub-path will go direactly to sub-route file
 */
async function fetchData(props) {
  const token = BStore.cookie.from_req(props.req, 'jwtToken')
  const gqClient = makeGQClient(token)

  const subpath = getSubPath(props)
  const mainPath = getMainPath(props)

  const community = gqClient.request(P.community, { raw: mainPath })
  const pagedContents = gqClient.request(
    ssrPagedSchema(subpath, { partialTags: true }),
    ssrCommunityFilter(mainPath, subpath)
  )

  return {
    ...(await community),
    ...(await pagedContents),
  }
}

/* filter: mergeRouteQuery(query), */
export default class Index extends React.Component {
  static async getInitialProps(props) {
    console.log('## community ## index page ..')

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

    const { community } = resp
    const pagedContents = ssrPagedContents(mainPath, subPath, resp)

    return R.merge(
      { sidebar: { activeCommunity: community }, route: { mainPath, subPath } },
      pagedContents
    )
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
              <BodyLayout>
                <Header />
                <CommunityBanner />
                <CommunityContent />
                <Footer />
              </BodyLayout>
            </MultiLanguage>
          </ThemeWrapper>
        </GAWraper>
      </Provider>
    )
  }
}
