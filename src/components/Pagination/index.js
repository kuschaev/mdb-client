// Core
import React from 'react';
// Instruments
import styled from 'styled-components';

const PagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    margin: 16px;
    width: calc(100vw - 32px);
`;
const PageBlock = styled.div`
    height: 20px;
    width: 20px;
    margin: 2px;
    border: 1px solid #8c8c8c;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    color: ${({ isCurrent }) => (isCurrent ? '#e39c32' : '#111')};
    &:hover {
        background-color: #ede555;
    }
`;

const Pagination = ({ currentPage, totalPages, pageChangeHandler }) => (
    <PagesContainer>
        {Array(totalPages)
            .fill()
            .map((_, index) => (
                <Page
                    key={index}
                    number={index + 1}
                    isCurrent={index + 1 === currentPage}
                    pageChangeHandler={pageChangeHandler}
                />
            ))}
    </PagesContainer>
);

const Page = ({ number, isCurrent, pageChangeHandler }) => (
    <PageBlock
        isCurrent={isCurrent}
        onClick={pageChangeHandler}
        data-page={number}
    >
        {number}
    </PageBlock>
);

export default Pagination;
