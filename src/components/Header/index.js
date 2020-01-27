// Core
import React from 'react';
// Components
import Nav from '../Nav';
// Instruments
import styled from 'styled-components';

const HeaderBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #323232;
    height: 64px;
    width: 100%;
`;

function Header(props) {
    return (
        <HeaderBlock>
            <Nav />
        </HeaderBlock>
    );
}

export default Header;
