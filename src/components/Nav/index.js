// Core
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
// Instruments
import styled from 'styled-components';

const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0px 3px 10px;
`;
const SubMenuContainer = styled(MenuContainer)`
    margin: 2px 0px 2px 10px;
`;
const StyledMenuItem = styled.div`
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #ff8340;
    ${'' /* background-color: #252525; */}
    margin: 4px 7px 4px 7px;
    ${'' /* width: 80px; */}
    cursor: pointer;
`;
const SubMenuItem = styled(StyledMenuItem)`
    font-size: 12px;
    font-weight: 400;
    text-transform: none;
`;

const Navigator = new Map([
    [
        { label: 'Discover', type: 'discover', key: 'd' },
        [
            { label: 'Movies', type: 'discover', subtype: 'movie', key: 'dm' },
            { label: 'TV Shows', type: 'discover', subtype: 'tv', key: 'dtv' }
        ]
    ],
    [
        { label: 'Movies', type: 'movie', key: 'm' },
        [
            { label: 'Popular', type: 'movie', subtype: 'popular', key: 'mp' },
            {
                label: 'Top Rated',
                type: 'movie',
                subtype: 'top_rated',
                key: 'mtr'
            },
            {
                label: 'Now Playing',
                type: 'movie',
                subtype: 'now_playing',
                key: 'mnp'
            },
            { label: 'Upcoming', type: 'movie', subtype: 'upcoming', key: 'mu' }
        ]
    ],
    [
        { label: 'TV Shows', type: 'tv', key: 'tv' },
        [
            { label: 'Popular', type: 'tv', subtype: 'popular', key: 'tvp' },
            {
                label: 'Top Rated',
                type: 'tv',
                subtype: 'top_rated',
                key: 'tvtr'
            },
            {
                label: 'On TV',
                type: 'tv',
                subtype: 'on_the_air',
                key: 'tvotr'
            },
            {
                label: 'Airing Today',
                type: 'tv',
                subtype: 'airing_today',
                key: 'tvat'
            }
        ]
    ]
]);

const MenuItem = ({ label, elementRef, itemClickHandler }) => {
    const handleClick = event => {
        event.preventDefault();
        itemClickHandler(elementRef);
    };
    return <StyledMenuItem onClick={handleClick}>{label}</StyledMenuItem>;
};

const Nav = ({ history }) => {
    const [subMenuVisible, setSubMenuVisibility] = useState(false);
    const [subMenuJSX, setSubMenuJSX] = useState(null);

    function navigateTo(event) {
        const { type, subtype } = event.currentTarget.dataset;
        const path = `/${type}/${subtype}`;
        history.push(path);
    }

    const handleMenuItemClick = elementRef => {
        setSubMenuVisibility(true);

        const smJSX = Navigator.get(elementRef).map(subMenuItem => (
            <SubMenuItem
                key={subMenuItem.key}
                data-type={subMenuItem.type}
                data-subtype={subMenuItem.subtype}
                onClick={navigateTo}
            >
                {subMenuItem.label}
            </SubMenuItem>
        ));
        console.log('smJSX', smJSX);

        setSubMenuJSX(smJSX);
    };

    return (
        <NavContainer>
            <MenuContainer>
                {Array.from(Navigator.keys()).map(element => (
                    <MenuItem
                        label={element.label}
                        key={element.key}
                        elementRef={element}
                        itemClickHandler={handleMenuItemClick}
                    />
                ))}
            </MenuContainer>
            <SubMenuContainer>
                {subMenuVisible ? subMenuJSX : null}
            </SubMenuContainer>
        </NavContainer>
    );
};

export default withRouter(Nav);
