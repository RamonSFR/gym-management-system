import styled from 'styled-components'

import { colors as c } from '../../Styles/GlobalStyles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
  gap: 32px;
  color: ${c.tertiary};

  span {
    color: ${c.lightPurple};
  }
`

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  row-gap: 32px;

  h5 {
    text-align: center;
    color: #e4e4e4e4;
    font-weight: 900;
    font-size: 1.5rem;
  }
`
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`

export const Card = styled.div`
  cursor: pointer;
  max-width: 272px;
  background-color: ${c.primary};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    object-fit: cover;
    width: 272px;
    height: 150px;
  }

  .card-info {
    padding: 12px 8px;
  }
`

export const ModalContent = styled.div`
  position: relative;
  background-color: ${c.secondary};
  padding: 32px;
  border-radius: 8px;
  z-index: 1001;

  .fa-xmark {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 24px;
    cursor: pointer;
  }

  h4 {
    font-weight: 900;
    font-size: 24px;
  }

  span {
    font-size: 18px;
    font-weight: 700;
  }

  .label {
    margin: 16px 0;
  }

  .exercise-list {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  .exercise-card {
    display: flex;
    flex-direction: column;
    background-color: ${c.primary};
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    text-align: center;

    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  .info-list {
    margin-top: 16px;
    font-size: 12px;
    font-weight: 350;
  }
`
