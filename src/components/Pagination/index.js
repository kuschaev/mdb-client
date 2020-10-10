// Core
import React from 'react';
// Instruments
import styled from 'styled-components';
// Icons
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const PagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    margin: 16px;
    width: calc(100vw - 32px);
`;
const PageBlock = styled.div`
    line-height: 30px;
    height: 30px;
    width: 30px;
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

const Pagination = ({
    currentPage,
    totalPages,
    pageChangeHandler,
    nextPageHandler,
    previousPageHandler,
}) => {
    console.log('➡️Pagination currentPage', currentPage);
    return (
        <PagesContainer>
            <ArrowButton
                pageChangeHandler={previousPageHandler}
                isNext={false}
            />
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
            <ArrowButton pageChangeHandler={nextPageHandler} isNext={true} />
        </PagesContainer>
    );
};

const Page = ({ number, isCurrent, pageChangeHandler }) => (
    <PageBlock
        isCurrent={isCurrent}
        onClick={pageChangeHandler}
        data-page={number}
    >
        {number}
    </PageBlock>
);

const ArrowButton = ({ pageChangeHandler, isNext }) => {
    return (
        <PageBlock onClick={pageChangeHandler}>
            {isNext ? <BsArrowRight /> : <BsArrowLeft />}
        </PageBlock>
    );
};

export default Pagination;
