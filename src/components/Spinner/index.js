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
    width: 40px;
    height: 40px;
    border: 5px solid #ffcc99;
    border-top: 6px solid #ff8533;
    border-radius: 100%;
    margin: auto;
    animation: ${rotated} 1s infinite linear;
    z-index: 1;
`;

const Spinner = () => <LoadingSpinner></LoadingSpinner>;

export default Spinner;
