/*
 *
 * Preview
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import dynamic from 'next/dynamic'

// import Link from 'next/link'

import { makeDebugger, storePlug, TYPE } from '../../utils'
import * as logic from './logic'

// TODO: move it to component
import { StateTree } from '../../components/'
import TypeWriterLoading from '../../components/LoadingEffects/TypeWriterLoading'
import {
  ArticleViwer,
  AccountViewer,
  AccountEditor,
  CommunityEditor,
  TagEditor,
  CategoryEditor,
  CategorySetter,
  ThreadSetter,
  TagSetter,
  CommunitySetter,
  PermissionEditor,
} from '../../containers'

import {
  PreviewOverlay,
  PreviewWrapper,
  PreviewCloser,
  PreviewContent,
  Closer,
  CloserInner,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Preview')
/* eslint-enable no-unused-vars */

const DynamicTypeWriter = dynamic(import('../TypeWriter'), {
  /* eslint-disable */
  loading: () => <TypeWriterLoading />,
  /* eslint-enable */
})

const CloseBtn = ({ type }) => (
  <PreviewCloser onClick={logic.closePreview}>
    <Closer type={type}>
      <CloserInner />
    </Closer>
  </PreviewCloser>
)

const Viewer = ({
  type,
  rootState,
  editCommunityData,
  editCategoryData,
  editTagData,
  editArticleData,
  editPermissionData,
}) => {
  switch (type) {
    case TYPE.PREVIEW_ACCOUNT_VIEW: {
      return <AccountViewer />
    }
    case TYPE.PREVIEW_ACCOUNT_EDIT: {
      return <AccountEditor />
    }
    case TYPE.POST_PREVIEW_VIEW: {
      return <ArticleViwer />
    }
    case TYPE.PREVIEW_CREATE_POST: {
      return <DynamicTypeWriter onClose={logic.closePreview} />
    }
    case TYPE.PREVIEW_CREATE_COMMUNITY: {
      return <CommunityEditor />
    }
    case TYPE.PREVIEW_UPDATE_COMMUNITY: {
      return <CommunityEditor editData={editCommunityData} />
    }
    case TYPE.PREVIEW_SET_COMMUNITY: {
      return <CommunitySetter editData={editArticleData} />
    }
    case TYPE.PREVIEW_CREATE_TAG: {
      return <TagEditor />
    }
    case TYPE.PREVIEW_UPDATE_TAG: {
      return <TagEditor editData={editTagData} />
    }
    case TYPE.PREVIEW_CREATE_CATEGORY: {
      return <CategoryEditor />
    }
    case TYPE.PREVIEW_UPDATE_CATEGORY: {
      return <CategoryEditor editData={editCategoryData} />
    }
    case TYPE.PREVIEW_SET_CATEGORY: {
      return <CategorySetter editData={editCommunityData} />
    }
    case TYPE.PREVIEW_SET_THREAD: {
      return <ThreadSetter editData={editCommunityData} />
    }
    case TYPE.PREVIEW_SET_TAG: {
      return <TagSetter editData={editArticleData} />
    }
    case TYPE.PREVIEW_UPDATE_PERMISSION: {
      return <PermissionEditor editData={editPermissionData} />
    }
    default: {
      return <StateTree json={rootState} />
    }
  }
}

class PreviewContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.preview)
  }

  render() {
    const {
      visible,
      type,
      themeKeys,
      curTheme,
      rootState,
      editCommunityData,
      editArticleData,
      editPermissionData,
      editCategoryData,
      editTagData,
    } = this.props.preview

    return (
      <div>
        <PreviewOverlay visible={visible} onClick={logic.closePreview} />
        <PreviewWrapper visible={visible} type={type}>
          <CloseBtn type={type} />
          <PreviewContent>
            <Viewer
              type={type}
              rootState={rootState}
              themeKeys={themeKeys}
              curTheme={curTheme}
              editCommunityData={editCommunityData}
              editCategoryData={editCategoryData}
              editTagData={editTagData}
              editArticleData={editArticleData}
              editPermissionData={editPermissionData}
            />
          </PreviewContent>
        </PreviewWrapper>
      </div>
    )
  }
}

export default inject(storePlug('preview'))(observer(PreviewContainer))
