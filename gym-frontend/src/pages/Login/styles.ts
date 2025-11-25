import styled from 'styled-components'
import { colors as c } from '../Styles/GlobalStyles'

export const Title = styled.h1`
  font-size: 4rem;
  color: ${c.lightPurple};
  margin-bottom: 2rem;
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

  h3 {
    text-align: center;
    color: ${c.darkPurple};
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
      width: 100%;
      padding: 8px;
      outline: none;
    }
  }

  p {
    text-align: center;
    font-size: .75rem;

    span {
        color: ${c.lightPurple};
        font-weight: bold;
        cursor: pointer;
    }
  }
`
