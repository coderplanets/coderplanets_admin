import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
  color: grey;
  font-size: 0.8rem;
  padding: 5px 10px;
  background: #fff6cf;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`

export const NumberInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`

export const Number = styled.span`
  color: yellowgreen;
  padding: 0 5px;
  border-radius: 100%;
  font-size: 0.9rem;
`
export const RootNumber = styled(Number)`
  color: orange;
`

export const Label = styled.div`
  flex-grow: 1;
  text-align: left;
`

export const UnitText = styled.div`
  font-size: 0.7rem;
  color: #a7a4a4;
  font-style: italic;
`

export const PermissionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
