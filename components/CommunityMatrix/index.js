/*
 *
 * CommunityMatrix
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import ReactTooltip from 'react-tooltip'

import {
  MatrixWrapper,
  CommunityLogo,
  GeneralPLogo,
  AddOnWrapper,
} from './styles'
import { ICON_ASSETS } from '../../config'

import { makeDebugger } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:CommunityMatrix:index')
/* eslint-enable no-unused-vars */

const tooltipOffset = JSON.stringify({ top: 5, right: -5 })

const Communities = ({ data, onSelect, activeRaw, lens }) => {
  if (!data || R.isEmpty(data.entries)) return <div />

  return (
    <React.Fragment>
      {data.entries.map(c => (
        <div
          key={shortid.generate()}
          onClick={onSelect.bind(this, c)}
          data-place="right"
          data-tip={c.title}
          data-for="permission_editor"
          data-offset={tooltipOffset}
        >
          <CommunityLogo
            src={c.logo}
            active={c.raw === activeRaw}
            len={R.contains(c.raw, lens)}
          />
        </div>
      ))}
    </React.Fragment>
  )
}

class CommunityMatrix extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 1000)
  }

  render() {
    const {
      data,
      activeRaw,
      lens,
      onSelect,
      onAddOnSelect,
      hasAddon,
    } = this.props
    // len={R.contains(c.raw, managerdRaws)}
    // active={c.raw === activeRaw}

    return (
      <MatrixWrapper>
        <Communities
          data={data}
          onSelect={onSelect}
          activeRaw={activeRaw}
          lens={lens}
        />

        <AddOnWrapper
          data-place="right"
          data-tip="基础权限"
          data-for="permission_editor"
          data-offset={tooltipOffset}
          onClick={onAddOnSelect}
          show={hasAddon}
        >
          <GeneralPLogo src={`${ICON_ASSETS}/cmd/all.svg`} />
        </AddOnWrapper>
      </MatrixWrapper>
    )
  }
}

CommunityMatrix.propTypes = {
  // https://www.npmjs.com/package/prop-types
  data: PropTypes.shape({
    // TODO add shape
    entries: PropTypes.array.isRequired,
    pageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }),

  onSelect: PropTypes.func,
  onAddOnSelect: PropTypes.func,
  activeRaw: PropTypes.string.isRequired,
  lens: PropTypes.arrayOf(PropTypes.string),
  hasAddon: PropTypes.bool,
}

CommunityMatrix.defaultProps = {
  data: {
    entries: [],
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
  },
  onSelect: debug,
  onAddOnSelect: debug,
  lens: [],
  hasAddon: true,
}

export default CommunityMatrix
