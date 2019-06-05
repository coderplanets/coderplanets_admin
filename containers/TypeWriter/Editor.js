/*
 * Editor based on Draft
 */

import React from 'react'
import T from 'prop-types'

import EditorHeader from './EditorHeader'
import BodyEditor from './BodyEditor'
import EditorFooter from './EditorFooter'

import { Wrapper, TitleInput, FooterWrapper } from './styles/editor'
import { titleOnChange, bodyOnChange } from './logic'

const Editor = ({ cpType, thread, title, body, linkAddr }) => (
  <Wrapper>
    <EditorHeader cpType={cpType} thread={thread} linkAddr={linkAddr} />
    <TitleInput
      placeholder="标 题."
      defaultValue=""
      value={title}
      onChange={titleOnChange}
    />

    <br />
    <BodyEditor onChange={bodyOnChange} body={body} />
    <FooterWrapper>
      <EditorFooter thread={thread} />
    </FooterWrapper>
  </Wrapper>
)

Editor.propTypes = {
  // https://www.npmjs.com/package/prop-types
  thread: T.string.isRequired,
  cpType: T.string.isRequired,
  body: T.string,
  title: T.string,
  linkAddr: T.string,
}

Editor.defaultProps = {
  body: '',
  title: '',
  linkAddr: '',
}

export default Editor
