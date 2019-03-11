import styled from 'styled-components'
// import { Img } from 'components'
import { animate } from 'utils'

export const FormItemWrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
`
export const FormLable = styled.div`
  font-size: 1em;
  color: grey;
  margin-right: 10px;
  margin-top: 5px;
`

export const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const BotWrapper = styled.div`
  border: 1px solid;
  border-color: ${props => (props.active ? 'grey' : '#F9FCFC')};
  padding: 3px;
  border-radius: 100%;
  margin-right: 5px;
`

export const ColorBot = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: ${props => props.color};
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    animation: ${animate.pulseRule};
    opacity: 0.6;
  }
`

export const Note = styled.div`
  background: #fffbe7;
  margin-top: 10px;
  padding: 2px 5px;
  border: 1px solid #ffe596;
  border-top: 3px solid #ffe596;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #afa37e;
`
