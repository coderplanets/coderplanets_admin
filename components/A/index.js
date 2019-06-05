/*
 *
 * A.js
 *
 * Renders an a tag, enforce use the
 */

import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

export const StyledA = styled.a`
  text-decoration: none;
  font-weight: bolder;
  color: ${props => props.theme.link};
  transition: color 0.3s;
  &:hover {
    text-decoration: underline;
  }
`

const A = ({ href, target, children }) => (
  <StyledA href={href} rel="noopener noreferrer" target={target}>
    {children}
  </StyledA>
)

A.propTypes = {
  href: T.oneOfType([T.string, T.object]).isRequired,
  children: T.oneOfType([T.string, T.arrayOf(T.node), T.node]).isRequired,
  target: T.string,
}

A.defaultProps = {
  target: '_blank',
}

export default A
