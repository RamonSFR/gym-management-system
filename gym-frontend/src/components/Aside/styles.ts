import styled from 'styled-components'

import { colors as c, breakpoints } from '../../Styles/GlobalStyles'

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;

  button {
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 8px;
    font-weight: 500;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.255);
    width: 100%;
    background-color: ${c.darkPurple};
    padding: 8px 16px;
    color: ${c.tertiary};

    &:hover {
      cursor: pointer;
    }

    &.isActive {
      background-color: ${c.lightPurple};
      color: ${c.primary};
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    overflow-x: auto;
    button {
      padding: 8px 12px;
      white-space: nowrap;
      font-size: 14px;
    }
  }
`

export const Hamburger = styled.button`
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1100;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background: ${c.lightPurple};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > div {
    width: 20px;
    height: 2px;
    background: ${c.primary};
    position: relative;
    transition: all 200ms ease;
  }

  & > div::before,
  & > div::after {
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background: ${c.primary};
    transition: all 200ms ease;
  }

  & > div::before {
    transform: translateY(-6px);
  }
  & > div::after {
    transform: translateY(6px);
  }

  & > div.open {
    background: transparent;
  }

  & > div.open::before {
    transform: rotate(45deg);
    top: 0;
  }

  & > div.open::after {
    transform: rotate(-45deg);
    top: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
  }
`

export const Overlay = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  opacity: 0;
  transition: opacity 200ms ease;

  &.visible {
    display: block;
    opacity: 1;
  }

  @media (min-width: ${breakpoints.mobile}) {
    display: none;
  }
`

export const AsideContainer = styled.aside`
  width: 250px;
  height: 100vh;
  background-color: ${c.primary};
  transition: transform 220ms ease;

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px;

    .user-icon {
      font-size: 128px;
    }

    h2 {
      font-size: 18px;
      font-weight: bold;
      color: ${c.tertiary};
    }

    h3 {
      color: #e4e4e4e4;
      font-weight: 500;
      font-size: 16px;
    }
  }

  &.open {
    transform: translateX(0);
  }

  @media (max-width: ${breakpoints.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-120%);
    z-index: 1100;
    width: calc(100vw * 0.78);
    max-width: 320px;
  }
`
