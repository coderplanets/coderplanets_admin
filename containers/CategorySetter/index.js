/*
 *
 * CategorySetter
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import R from 'ramda'

import shortid from 'shortid'

// import Link from 'next/link'
import { makeDebugger, storePlug } from '../../utils'

import { Wrapper, Divider, CategoryWrapper, CategoryTag } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CategorySetter')
/* eslint-enable no-unused-vars */

const CategoriesList = ({ communityId, categories, selectedCids }) => (
  <CategoryWrapper>
    {categories.map(c => (
      <CategoryTag
        key={shortid.generate()}
        active={R.contains(c.id, selectedCids)}
        onClick={logic.onAdd.bind(this, communityId, c.id, selectedCids)}
      >
        {c.title}
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

class CategorySetterContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.categorySetter)
  }

  render() {
    /* const mutating = false */
    const { categorySetter, editData } = this.props
    const { pagedCategories } = categorySetter

    const selectedCids = R.pluck('id', editData.categories)

    return (
      <Wrapper>
        coderplanets
        <h2>设置社区分类</h2>
        <Divider />
        {pagedCategories ? (
          <CategoriesList
            communityId={editData.id}
            categories={pagedCategories.entries}
            selectedCids={selectedCids}
          />
        ) : (
          <div />
        )}
      </Wrapper>
    )
  }
}

export default inject(storePlug('categorySetter'))(
  observer(CategorySetterContainer)
)
