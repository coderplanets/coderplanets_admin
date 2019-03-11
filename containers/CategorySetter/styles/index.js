import styled from 'styled-components'

// import { Img } from 'components'
import { animate } from 'utils'

export const Wrapper = styled.div`
  background: #ffffff;
  padding-top: 20px;
  padding-bottom: 50px;
  height: 100%;
  min-height: 80vh;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  background: #f9fcfc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: ${animate.fadeInRightRule};
`

export const Divider = styled.div`
  border-top: 1px solid #e3eeed;
  margin-top: 15px;
  width: 75%;
  margin-bottom: 20px;
`

export const CategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
`

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  background: ${props => (props.active ? '#e4f7fe' : '#ececec')};
  border: 1px dashed #97dbfc;
  color: ${props => (props.active ? '#0692fa' : 'grey')};
  padding: 5px 20px;
  border-radius: 3px;
  margin-right: 15px;
  margin-bottom: 10px;
  &:hover {
    border: 1px solid #97dbfc;
    cursor: ${props => (props.active ? '' : 'pointer')};
  }
`
