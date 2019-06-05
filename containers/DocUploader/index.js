/*
 *
 * DocUploader
 *
 */
import React from 'react'
import { inject, observer } from 'mobx-react'
import T from 'prop-types'

import { ASSETS_ENDPOINT } from '@config'

import { buildLog, storePlug, uid } from '@utils'
import { Wrapper, InputFile } from './styles'

import { init, onUploadError, getOSSDir, getOSSFileName } from './logic'

/* eslint-disable no-unused-vars */
const debug = buildLog('C:DocUploader')
/* eslint-enable no-unused-vars */

class DocUploaderContainer extends React.Component {
  /*
  constructor(props) {
    super(props)

    const { docUploader } = props
    init(docUploader)
    this.initOssClient()

    this.state = {
      ossClient: null,
      uniqueId: uid.gen(),
    }
  }
  */

  state = {
    ossClient: null,
    // use unique id to init the file input, otherwise it will be the some instance
    uniqueId: uid.gen(),
  }

  componentDidMount() {
    const { docUploader } = this.props
    init(docUploader)
    this.initOssClient()
  }

  componentWillUnmount() {
    /* eslint-disable */
    delete this.state.ossClient
    /* eslint-enable */
  }

  initOssClient() {
    /* eslint-disable */
    /* OSS sdk is import in _document from ali cdn */
    try {
      /* this.state.ossClient = new OSS.Wrapper({ */
      const ossClient = new OSS.Wrapper({
        region: process.env.ALI_OSS_RESION,
        accessKeyId: process.env.ALI_ACCESS_KEY,
        accessKeySecret: process.env.ALI_ACCESS_SECRET,
        bucket: process.env.ALI_OSS_BUCKET,
        /* internal: true, */
        /* secure: true, */
      })

      this.setState({ ossClient })
    } catch (e) {
      console.error(e)
      this.props.onUploadError(e)
    }
    /* eslint-enable */
  }

  onUploadDone(url) {
    /* eslint-disable */
    this.props.onUploadDone(url)
    delete this.state.ossClient
    /* eslint-enable */
    this.initOssClient()
  }

  /* eslint-disable */
  handleCHange(e) {
    console.log('handleCHange e: ', e)
    const files = e.target.files
    /* console.log('handleCHange files: ', files) */
    const theFile = files[0]
    if (!theFile) return false

    const FileSize = theFile.size / 1024 / 1024
    if (FileSize > 2) {
      return alert('资源有限，请不要上传大于 2MB 的文件')
    }

    this.props.onUploadStart()
    const filename = theFile.name
    const fullpath = `${getOSSDir()}/${getOSSFileName(filename)}`

    this.state.ossClient
      .multipartUpload(fullpath, theFile)
      .then(result => {
        const url = `${ASSETS_ENDPOINT}/${result.name}`
        this.onUploadDone(url)
      })
      .catch(err => this.props.onUploadError(err))
  }
  /* eslint-enable */

  render() {
    const { children } = this.props
    const { uniqueId } = this.state

    return (
      <Wrapper>
        <InputFile
          type="file"
          name={`file-${uniqueId}`}
          id={`file-${uniqueId}`}
          accept="image/*"
          onChange={this.handleCHange.bind(this)}
        />
        {/* eslint-disable */}
        <label htmlFor={`file-${uniqueId}`}>{children}</label>
        {/* eslint-enable */}
      </Wrapper>
    )
  }
}

DocUploaderContainer.propTypes = {
  children: T.oneOfType([T.string, T.node]).isRequired,
  onUploadStart: T.func,
  onUploadError: T.func,
  onUploadDone: T.func,
  docUploader: T.any.isRequired,
}

DocUploaderContainer.defaultProps = {
  onUploadStart: debug,
  onUploadDone: debug,
  onUploadError,
}

export default inject(storePlug('docUploader'))(observer(DocUploaderContainer))
