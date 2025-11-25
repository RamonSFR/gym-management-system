import styled from 'styled-components'

import {colors as c} from '../../pages/Styles/GlobalStyles'

export const Btn = styled.button`
    padding: 8px 12px;
    background-color: ${c.lightPurple};
    color: ${c.tertiary};
    font-weight: bold;
    font-size: 14px;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: ${c.darkPurple};
    }
`
