import styled from 'styled-components'
import { colors as C } from '../Styles/GlobalStyles'

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
`

export const AddButtonContainer = styled.div`
  margin-bottom: 24px;
`

export const Button = styled.button`
  background-color: ${C.lightPurple};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 4px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: ${C.darkPurple};
    transition: background-color 0.2s;
  }
`

export const List = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #fafafa;

  &:last-child {
    margin-bottom: 0;
  }

  input {
    flex: 1;
    padding: 10px 12px;
    border: 2px solid ${C.lightPurple};
    border-radius: 6px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: ${C.darkPurple};
    }
  }

  span {
    flex: 1;
    font-weight: 600;
    color: ${C.primary};
    font-size: 15px;
  }
`
export const DetailsSection = styled.div`
  background-color: #f0f0f0;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  margin-bottom: 12px;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }

  div {
    padding: 8px 0;
    color: ${C.primary};
    font-size: 14px;
  }
`

export const DetailField = styled.div`
  margin-bottom: 12px;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    color: ${C.primary};
  }

  input {
    width: 100%;
    padding: 8px;
    border: 2px solid ${C.lightPurple};
    border-radius: 6px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: ${C.darkPurple};
    }
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: center;
`

export const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ConfirmContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;

  h3 {
    color: ${C.primary};
    margin-bottom: 12px;
  }

  p {
    color: ${C.secondary};
    margin-bottom: 24px;
  }
`
