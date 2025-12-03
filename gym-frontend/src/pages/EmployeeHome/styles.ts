import styled from 'styled-components'

import { colors as c } from '../../Styles/GlobalStyles'
export const Container = styled.div`
  display: flex;
`

export const ContentArea = styled.div`
  padding: 32px;
  width: 100%;
`

export const AccountContainer = styled.div`
  max-width: 720px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  h2 {
    color: ${c.darkPurple};
    margin-bottom: 16px;
  }
`

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`

export const Label = styled.label`
  width: 120px;
  font-weight: 600;
`

export const Input = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;

  &.isError {
    border-color: #ff4d4f;
  }
`

export const ReadonlyValue = styled.div`
  flex: 1;
  padding: 8px 10px;
  background: #f7f7f7;
  border-radius: 6px;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`
