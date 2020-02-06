// Core
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
// Instruments
import Navigator from '../../instruments/navigator';
import styled, { css } from 'styled-components';

const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0px 0px 10px;
`;
const SubMenuContainer = styled(MenuContainer)`
    margin: 0px 0px 2px 10px;
`;
const StyledMenuItem = styled.div`
    ${({ isActive }) =>
        isActive
            ? css`
                  color: #f5cf11;
                  background-color: #252525;
                  border-radius: 5px 5px 0 0;
                  box-shadow: 1px 1px #111;
              `
            : css`
                  color: #ff8340;
                  &:hover {
                      color: #eee;
                  }
              `}
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 4px 7px;
    cursor: pointer;
`;
const SubMenuItem = styled(StyledMenuItem)`
    font-size: 12px;
    font-weight: 400;
    text-transform: none;
    background-color: #252525;
    box-shadow: 1px 1px #111;
    &:hover {
        color: #eee;
    }
    &:first-child {
        border-radius: 0 0 0 5px;
    }
    &:last-child {
        border-radius: 0 5px 5px 0;
    }
`;

const MenuItem = ({ label, isActive, elementRef, itemClickHandler }) => {
    const handleClick = event => {
        event.preventDefault();
        itemClickHandler(event, elementRef);
    };
    return (
        <StyledMenuItem onClick={handleClick} isActive={isActive}>
            {label}
        </StyledMenuItem>
    );
};

const Nav = ({ history }) => {
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    const [subMenuVisible, setSubMenuVisibility] = useState(false);
    const [subMenuJSX, setSubMenuJSX] = useState(null);

    function navigateTo(event) {
        const { type, subtype } = event.currentTarget.dataset;
        const path = `/list/${type}/${subtype}`;
        history.push(path);
    }

    const handleMenuItemClick = (event, elementRef) => {
        setSubMenuVisibility(true);
        setActiveMenuItem(elementRef.type);

        const smJSX = Navigator.get(elementRef).map(
            ({ key, type, subtype, label }) => (
                <SubMenuItem
                    key={key}
                    data-type={type}
                    data-subtype={subtype}
                    onClick={navigateTo}
                >
                    {label}
                </SubMenuItem>
            )
        );

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
                        isActive={element.type === activeMenuItem}
                        itemClickHandler={handleMenuItemClick}
                    />
                ))}
            </MenuContainer>
            <SubMenuContainer>{subMenuVisible && subMenuJSX}</SubMenuContainer>
        </NavContainer>
    );
};

export default withRouter(Nav);
