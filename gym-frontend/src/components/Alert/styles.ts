import styled from "styled-components";
import type { Props } from ".";

export const AlertContainer = styled.div<Props>`
    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        10% {
            opacity: 1;
            transform: translateY(0);
        }
        90% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

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
    animation: slideIn 5s ease-in-out forwards;

    &.success {
        background-color: #d4edda;
        color: #155724;
    }

    &.error {
        background-color: #f8d7da;
        color: #721c24;
    }
`
