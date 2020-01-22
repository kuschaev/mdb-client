// Core
import React from 'react';
// Instruments
import styled, { keyframes } from 'styled-components';

const rotated = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const LoadingSpinner = styled.div`
    width: 30px;
    height: 30px;
    border: 3px solid #a6a6ff;
    border-top: 4px solid #4f4fff;
    border-radius: 100%;
    margin: auto;
    animation: ${rotated} 1s infinite linear;
    z-index: 1;
`;

const Spinner = () => <LoadingSpinner></LoadingSpinner>;

export default Spinner;
