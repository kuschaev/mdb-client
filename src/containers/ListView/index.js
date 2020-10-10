// Core
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Components
import PosterList from '../../components/PosterList';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
// Instruments
import { api } from '../../api/api';
import styled from 'styled-components';

const ListViewFlexContainer = styled.div`
    flex: 1;
`;
const SpinnerFlexContainer = styled.div`
    height: calc(100vh - 172px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const useQuery = () => new URLSearchParams(useLocation().search);

export default function ListView({ history, location, match }) {
    const { type, listType: subtype } = match.params;

    const page = parseInt(useQuery().get('page')) || 1;

    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);
    const [postersList, setPostersList] = useState([]);

    const handlePageChange = ({
        currentTarget: {
            dataset: { page },
        },
    }) => {
        console.log('page', page);
        setCurrentPage(parseInt(page));
        history.push({
            search: `?${new URLSearchParams({ page: page }).toString()}`,
        });
    };

    const handlePageIncrement = () => {
        const nextPage = currentPage + 1 > totalPages ? totalPages : currentPage + 1;
        setCurrentPage(parseInt(nextPage));
        history.push({
            search: `?${new URLSearchParams({ page: nextPage }).toString()}`,
        });
    };
    const handlePageDecrement = () => {
        const prevPage = currentPage - 1 < 1 ? 1 : currentPage - 1;
        setCurrentPage(parseInt(prevPage));
        history.push({
            search: `?${new URLSearchParams({ page: prevPage }).toString()}`,
        });
    };

    useEffect(() => {
        setIsLoading(true);
        const getPostersList = async () => {
            const { results, total_pages } = await api.getList(
                type,
                subtype,
                currentPage
            );

            setPostersList(results);
            setTotalPages(total_pages);
            setIsLoading(false);
        };
        console.log('ZAPROS ULETEL');
        getPostersList();
    }, [type, subtype, currentPage]);

    return (
        <ListViewFlexContainer>
            {isLoading ? (
                <SpinnerFlexContainer>
                    <Spinner />
                </SpinnerFlexContainer>
            ) : (
                <>
                    <PosterList posters={postersList} type={type} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageChangeHandler={handlePageChange}
                        nextPageHandler={handlePageIncrement}
                        previousPageHandler={handlePageDecrement}
                    />
                </>
            )}
        </ListViewFlexContainer>
    );
}
