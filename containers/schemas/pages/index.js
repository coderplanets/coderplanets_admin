import F from '../fragments'

import { pagedPosts, post } from './post'
import { pagedJobs, job } from './job'
import { pagedVideos, video } from './video'
import { pagedRepos, repo } from './repo'
import { user } from './user'
import { pagedCommunities } from './community'
import { pagedTags } from './tag'
import { pagedThreads } from './thread'

const P = {
  pagedCommunities,
  community: `
    query community($id: ID, $raw: String) {
      community(id: $id, raw: $raw) {
        ${F.community}
        threads {
          title
          raw
        }
        subscribersCount
        editorsCount
        postsCount
      }
    }
  `,
  partialTags: `
    query($communityId: ID, $community: String, $thread: CmsThread!) {
      partialTags(communityId: $communityId, community: $community, thread: $thread) {
        ${F.tag}
        thread
      }
    }
  `,
  pagedTags,
  pagedThreads,
  // post
  pagedPosts,
  post,
  // job
  pagedJobs,
  job,
  // video
  pagedVideos,
  video,
  // repo
  pagedRepos,
  repo,
  // user
  user,
}

export default P
