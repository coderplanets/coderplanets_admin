import { types as t } from 'mobx-state-tree'
import { TAG_COLORS, CMS_PARTS } from '../../config'

import { Community } from '../SharedModel'

const Tag = t.model('Tag', {
  id: t.maybe(t.string),
  title: t.maybe(t.string),
  color: t.optional(t.enumeration('color', TAG_COLORS), TAG_COLORS[0]),
  // TODO: change to Enum
  /* part: t.maybe(t.string), */
  part: t.optional(t.enumeration('part', CMS_PARTS), CMS_PARTS[0]),
  community: t.maybe(Community),
  insertedAt: t.optional(t.string, ''),
  updatedAt: t.optional(t.string, ''),
})

export default Tag
