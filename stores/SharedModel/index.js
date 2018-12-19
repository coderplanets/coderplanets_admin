export { Community, PagedCommunities } from './Community'
export { default as Article } from './Article'
export {
  Comment,
  PagedComments,
  PagedPostComments,
  PagedJobComments,
  PagedVideoComments,
  PagedRepoComments,
} from './Comment'

export { Tag, PagedTags } from './Tag'
export { Thread, PagedThreads } from './Thread'
export { Category, PagedCategories } from './Category'

export { Post, PagedPosts } from './Post'
export { Job, PagedJobs } from './Job'

export { EmptyUser, User, SimpleUser } from './User'

export const emptyPagiData = {
  entries: [],
  pageNumber: 1,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
}
