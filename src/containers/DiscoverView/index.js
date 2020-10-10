// Core
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Components
import ControlPanel from '../../components/ControlPanel';
import PosterList from '../../components/PosterList';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
// Instruments
import { api } from '../../api/api';
import getYearsSinceArray from '../../instruments/utils';
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

export default function DiscoverView({ history, location, match }) {
    const { type } = match.params;

    const page = parseInt(useQuery().get('page')) || 1;

    // TODO: going to '/discover/movie' must nullify current page state
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(undefined);

    const [selectedYear, setYear] = useState(2019);
    const [isLoading, setIsLoading] = useState(true);
    const [postersList, setPostersList] = useState([]);

    const mediaFormats = ['movie', 'tv'];
    const years = getYearsSinceArray(1970);

    const handleSelectedYearChange = year => setYear(year);
    const handlePageChange = ({
        currentTarget: {
            dataset: { page }
        }
    }) => {
        setCurrentPage(parseInt(page));
        history.push({
            search: `?${new URLSearchParams({ page: page }).toString()}`
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
            const { results, total_pages } = await api.getDiscover(
                type,
                undefined,
                currentPage,
                selectedYear
            );

            setPostersList(results);
            setTotalPages(total_pages);
            setIsLoading(false);
        };
        console.log('ZAPROS ULETEL');
        getPostersList();
    }, [type, currentPage, selectedYear]);

    return (
        <ListViewFlexContainer>
            <ControlPanel
                years={years}
                yearsChangeHandler={handleSelectedYearChange}
            />
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
