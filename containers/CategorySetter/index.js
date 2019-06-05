/*
 *
 * CategorySetter
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import R from 'ramda'

import { uid, buildLog, storePlug } from '@utils'
import { Wrapper, Divider, CategoryWrapper, CategoryTag } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = buildLog('C:CategorySetter')
/* eslint-enable no-unused-vars */

const CategoriesList = ({ communityId, categories, selectedids }) => (
  <CategoryWrapper>
    {categories.map(c => (
      <CategoryTag
        key={uid.gen()}
        active={R.contains(c.id, selectedids)}
        onClick={logic.onAdd.bind(this, communityId, c.id, selectedids)}
      >
        {c.title}
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

class CategorySetterContainer extends React.Component {
  componentDidMount() {
    const { categorySetter } = this.props
    logic.init(categorySetter)
  }

  render() {
    /* const mutating = false */
    const { categorySetter, editData } = this.props
    const { pagedCategories } = categorySetter

    const selectedids = R.pluck('id', editData.categories)

    return (
      <Wrapper>
        coderplanets
        <h2>设置社区分类</h2>
        <Divider />
        {pagedCategories ? (
          <CategoriesList
            communityId={editData.id}
            categories={pagedCategories.entries}
            selectedids={selectedids}
          />
        ) : null}
      </Wrapper>
    )
  }
}

export default inject(storePlug('categorySetter'))(
  observer(CategorySetterContainer)
)
