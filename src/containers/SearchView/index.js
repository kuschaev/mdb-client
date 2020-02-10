// Core
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Components
import PosterList from '../../components/PosterList';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Spinner from '../../components/Spinner';
// Instruments
import { api } from '../../api/api';
import useDebounce from '../../hooks';
import styled from 'styled-components';

const SearchViewFlexContainer = styled.div`
    flex: 1;
`;
const SpinnerFlexContainer = styled.div`
    height: calc(100vh - 188px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const useQuery = () => new URLSearchParams(useLocation().search);

export default function SearchView({ history, location, match }) {
    const { type } = match.params;

    const page = parseInt(useQuery().get('page')) || 1;
    const query = useQuery().get('query') || '';

    const [searchQuery, setSearchQuery] = useState(query);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [postersList, setPostersList] = useState([]);

    let debouncedSearchQuery = useDebounce(searchQuery, 700);

    const handleSearchQueryChange = searchQueryValue => {
        setSearchQuery(searchQueryValue);
        // ? don't forget to sort this out
        const { pathname } = location;
        const searchParams = new URLSearchParams(location.search);
        if (searchQueryValue) {
            searchParams.set('query', searchQueryValue);
            searchParams.set('page', '1');
            history.push({
                pathname: pathname,
                search: searchParams.toString()
            });
        } else {
            history.push({
                pathname: pathname,
                search: ''
            });
        }
    };

    const handlePageChange = ({
        currentTarget: {
            dataset: { page }
        }
    }) => {
        setCurrentPage(parseInt(page));
        const { pathname } = location;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        history.push({
            pathname: pathname,
            search: searchParams.toString()
        });
    };

    useEffect(() => {
        setSearchQuery(query);
    }, [type, query]);

    useEffect(() => {
        if (debouncedSearchQuery) {
            setIsLoading(true);
            const getPostersList = async () => {
                const { results, total_pages } = await api.searchFor(
                    type,
                    debouncedSearchQuery,
                    currentPage
                );

                setPostersList(results);
                setTotalPages(total_pages);
                setIsLoading(false);
            };

            getPostersList();
        } else {
            setPostersList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchQuery, currentPage]);

    return (
        <>
            <SearchViewFlexContainer>
                <SearchBar
                    searchQueryValue={searchQuery}
                    searchQueryChangeHandler={handleSearchQueryChange}
                />
                {isLoading ? (
                    <SpinnerFlexContainer>
                        <Spinner />
                    </SpinnerFlexContainer>
                ) : searchQuery && totalPages === 0 ? (
                    <SpinnerFlexContainer>
                        <p>I found nothing matching your query.</p>
                    </SpinnerFlexContainer>
                ) : postersList.length ? (
                    <>
                        <PosterList posters={postersList} type={type} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageChangeHandler={handlePageChange}
                        />
                    </>
                ) : (
                    <SpinnerFlexContainer>
                        <p>Start typing...</p>
                    </SpinnerFlexContainer>
                )}
            </SearchViewFlexContainer>
        </>
    );
}
