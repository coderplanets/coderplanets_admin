// import R from 'ramda'
import { P } from '../containers/schemas'
import { ROUTE } from './constants'

export const ssrPagedSchema = (subpath, opt = {}) => {
  switch (subpath) {
    case ROUTE.CATEGORIES: {
      return P.pagedCategories
    }
    case ROUTE.TAGS: {
      if (opt.partialTags) {
        return P.partialTags
      }
      return P.pagedTags
    }
    case ROUTE.THREADS: {
      return P.pagedThreads
    }
    case ROUTE.POSTS: {
      return P.pagedPosts
    }
    case ROUTE.JOBS: {
      return P.pagedJobs
    }
    case ROUTE.REPOS: {
      return P.pagedRepos
    }
    case ROUTE.VIDEOS: {
      return P.pagedVideos
    }
    case ROUTE.SUBSCRIBERS: {
      return P.communitySubscribers
    }
    default: {
      return P.pagedCommunities
    }
  }
}

export const ssrPagedContents = (mainPath, subPath, resp) => {
  switch (mainPath) {
    case ROUTE.COMMUNITIES: {
      return ssrCommunitiesContents(subPath, resp)
    }

    default: {
      return ssrCommunityContents(subPath, resp)
    }
  }
}

// communityContent
const ssrCommunityContents = (subPath, resp) => {
  switch (subPath) {
    case ROUTE.POSTS: {
      return {
        communityContent: { pagedPosts: resp.pagedPosts },
      }
    }
    case ROUTE.JOBS: {
      return {
        communityContent: { pagedJobs: resp.pagedJobs },
      }
    }
    case ROUTE.VIDEOS: {
      return {
        communityContent: { pagedVideos: resp.pagedVideos },
      }
    }
    case ROUTE.REPOS: {
      return {
        communityContent: { pagedRepos: resp.pagedRepos },
      }
    }
    case ROUTE.TAGS: {
      return {
        communityContent: { pagedTags: resp.partialTags },
      }
    }
    case ROUTE.SUBSCRIBERS: {
      return {
        communityContent: { pagedSubscribers: resp.communitySubscribers },
      }
    }
    default: {
      return {
        communityContent: { pagedPosts: resp.pagedPosts },
      }
    }
  }
}

const ssrCommunitiesContents = (subPath, resp) => {
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
    case ROUTE.JOBS: {
      return {
        communitiesContent: { pagedJobs: resp.pagedJobs },
      }
    }
    case ROUTE.REPOS: {
      return {
        communitiesContent: { pagedRepos: resp.pagedRepos },
      }
    }
    case ROUTE.VIDEOS: {
      return {
        communitiesContent: { pagedVideos: resp.pagedVideos },
      }
    }
    default: {
      return {
        communitiesContent: { pagedCommunities: resp.pagedCommunities },
      }
    }
  }
}

export const ssrCommunityFilter = (community, subPath) => {
  switch (subPath) {
    case ROUTE.TAGS: {
      return {
        community,
        all: true,
      }
    }
    case ROUTE.THREADS: {
      return { filter: { page: 1, size: 30 } }
    }
    case ROUTE.SUBSCRIBERS: {
      return { filter: { page: 1, size: 30 }, community }
    }
    default: {
      return { filter: { page: 1, size: 30, community } }
    }
  }
}
