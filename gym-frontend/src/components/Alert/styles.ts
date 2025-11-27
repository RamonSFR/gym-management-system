import styled from "styled-components";
import type { Props } from ".";

export const AlertContainer = styled.div<Props>`
    position: absolute;
    top: 64px;
    right: 64px;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    border-radius: 4px;
    margin: 16px 0;
    font-size: 14px;

    &.success {
        background-color: #d4edda;
        color: #155724;
    }

    &.error {
        background-color: #f8d7da;
        color: #721c24;
    }
`
