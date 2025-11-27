import styled from 'styled-components'
import { colors as c } from '../Styles/GlobalStyles'

export const Title = styled.h1`
  font-size: 4rem;
  color: ${c.lightPurple};
  margin-bottom: 2rem;
  text-shadow: -4px 4px 6px ${c.darkPurple};
`

export const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  width: clamp(300px, 90%, 400px);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: 1rem;
  padding: 16px;
  background-color: ${c.tertiary};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);

  .login-icon {
    font-size: 3rem;
    color: ${c.lightPurple};
    align-self: center;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 2px;

    label {
      color: ${c.darkPurple};
      font-weight: bold;
      font-size: 12px;
    }

    input {
      border-radius: 4px;
      width: 100%;
      padding: 8px;
      outline: none;
      border: 1px solid ${c.darkPurple};

      &.error {
        border: 1px solid #ff4d62ff;
      }
    }
  }

  p {
    text-align: center;
    font-size: 0.75rem;
    color: ${c.primary};
    font-weight: 300;

    span {
      color: ${c.lightPurple};
      font-weight: bold;
      cursor: pointer;
    }
  }
`

export const ButtonsSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;

  .member-button {
    border-radius: 8px 0 0 8px;
  }

  .employee-button {
    border-radius: 0 8px 8px 0;
  }

  .is-active {
    background-color: ${c.lightPurple};
    color: ${c.tertiary};
  }

  button {
    width: 40%;
    padding: 4px 6px;
    border: 1px solid ${c.lightPurple};
    outline: none;
    background-color: #dadadaff;
    cursor: pointer;
  }
`
