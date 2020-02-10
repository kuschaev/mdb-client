// Core
import React from 'react';
// Instruments
import styled from 'styled-components';

const SearchBarContainer = styled.div`
    margin: 16px;
    height: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
`;

const SearchBar = ({ searchQueryValue, searchQueryChangeHandler }) => {
    const handleSearchQueryChange = e =>
        searchQueryChangeHandler(e.target.value.toLowerCase());

    return (
        <SearchBarContainer>
            <input
                type='search'
                placeholder='Search...'
                value={searchQueryValue}
                onChange={handleSearchQueryChange}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;
