// import R from 'ramda'
import { P } from '../containers/schemas'
import { ROUTE } from './constants'

export const ssrPagedSchema = subpath => {
  switch (subpath) {
    case ROUTE.CATEGORIES: {
      return P.pagedCategories
    }
    case ROUTE.TAGS: {
      return P.pagedTags
    }
    case ROUTE.THREADS: {
      return P.pagedThreads
    }
    case ROUTE.POSTS: {
      return P.pagedPosts
    }
    case ROUTE.REPOS: {
      return P.pagedRepos
    }
    default: {
      return P.pagedCommunities
    }
  }
}

export const ssrPagedContents = (mainPath, subPath, resp) => {
  switch (subPath) {
    case ROUTE.CATEGORIES: {
      return {
        communitiesContent: { pagedCategories: resp.pagedCategories },
      }
    }
    case ROUTE.TAGS: {
      return {
        communitiesContent: { pagedTags: resp.pagedTags },
      }
    }
    case ROUTE.THREADS: {
      return {
        communitiesContent: { pagedThreads: resp.pagedThreads },
      }
    }
    case ROUTE.POSTS: {
      return {
        communitiesContent: { pagedPosts: resp.pagedPosts },
      }
    }
    case ROUTE.REPOS: {
      return {
        communitiesContent: { pagedRepos: resp.pagedRepos },
      }
    }
    default: {
      return {
        communitiesContent: { pagedCommunities: resp.pagedCommunities },
      }
    }
  }
}
