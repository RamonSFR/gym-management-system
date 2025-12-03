import { createGlobalStyle } from 'styled-components'

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px'
}

export const colors = {
  primary: '#020202',
  secondary: '#242424',
  tertiary: '#FBFAEE',
  lightPurple: '#933DC9',
  darkPurple: '#53118F'
}

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans', sans-serif;
        text-decoration: none;
        list-style: none;
    }

    html {
        scroll-behavior: smooth;
        background-color: ${colors.secondary};
    }
`

export default GlobalStyles
