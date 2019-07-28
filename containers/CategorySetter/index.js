/*
 *
 * CategorySetter
 *
 */

import React from 'react'
import R from 'ramda'

import { uid, buildLog, connectStore } from '@utils'
import { Wrapper, Divider, CategoryWrapper, CategoryTag } from './styles'

import { useInit, onAdd } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:CategorySetter')
/* eslint-enable no-unused-vars */

const CategoriesList = ({ communityId, categories, selectedids }) => (
  <CategoryWrapper>
    {categories.map(c => (
      <CategoryTag
        key={uid.gen()}
        active={R.contains(c.id, selectedids)}
        onClick={onAdd.bind(this, communityId, c.id, selectedids)}
      >
        {c.title}
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

const CategorySetterContainer = ({ categorySetter, editData }) => {
  useInit(categorySetter)

  /* const mutating = false */
  const { pagedCategories } = categorySetter

  const selectedids = R.pluck('id', editData.categories)

  return (
    <Wrapper>
      coderplanets
      <h2>设置社区分类</h2>
      <Divider />
      {pagedCategories && (
        <CategoriesList
          communityId={editData.id}
          categories={pagedCategories.entries}
          selectedids={selectedids}
        />
      )}
    </Wrapper>
  )
}

export default connectStore(CategorySetterContainer)
