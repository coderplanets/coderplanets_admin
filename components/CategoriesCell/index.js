/*
 *
 * CategoriesCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { ICON_ASSETS } from '../../config'

import { AdderCell, Icon } from '../../components'

import {
  Wrapper,
  CategoryWrapper,
  CategoryTag,
  DeleteCross,
  AddIcon,
} from './styles'

import { uid } from '../../utils'
// import { inject, observer } from 'mobx-react'
// import Link from 'next/link'

const CategoriesList = ({ source, onDelete }) => (
  <CategoryWrapper>
    {source.categories.map(c => (
      <CategoryTag key={uid.gen()}>
        {c.title}
        <DeleteCross onClick={onDelete.bind(this, source.id, c)}>
          <Icon type="cross" />
        </DeleteCross>
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

class CategoriesCell extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { source, onDelete, onAdd } = this.props

    return (
      <div>
        {R.isEmpty(source.categories) ? (
          <AdderCell onAdd={onAdd.bind(this, source)} />
        ) : (
          <Wrapper>
            <CategoriesList source={source} onDelete={onDelete} />
            <div onClick={onAdd.bind(this, source)}>
              <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
            </div>
          </Wrapper>
        )}
      </div>
    )
  }
}

export default CategoriesCell

CategoriesCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  source: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

CategoriesCell.defaultProps = {
  categories: [],
}
