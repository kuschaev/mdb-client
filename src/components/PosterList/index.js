// Core
import React from 'react';
import { Link } from 'react-router-dom';
// Components
import PosterCard from '../PosterCard';
// Instruments
import styled from 'styled-components';

const ListContainer = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: default;
    &:hover,
    &:focus,
    &:visited,
    &:active,
    &:link {
        text-decoration: none;
    }
`;

const PosterList = ({ posters, type }) => (
    <ListContainer>
        {posters.map(poster => (
            <StyledLink key={poster.id} to={`/${type}/${poster.id}`}>
                <PosterCard key={poster.id} {...poster} />
            </StyledLink>
        ))}
    </ListContainer>
);

export default PosterList;
