// Core
import React, { useState, useEffect } from 'react';
// Components
import ControlPanel from '../ControlPanel';
import PosterList from '../PosterList';
import Spinner from '../Spinner';
// Instruments
import { api } from '../../api/api';
import getYearsSinceArray from '../../instruments/utils';
import styled from 'styled-components';
import Pagination from '../Pagination';
import { useLocation } from 'react-router-dom';

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

    const [mediaFormat, setMediaFormat] = useState(subtype);
    const [selectedYear, setYear] = useState(2019);
    const [isLoading, setIsLoading] = useState(true);
    const [postersList, setPostersList] = useState([]);

    const mediaFormats = ['movie', 'tv'];
    const years = getYearsSinceArray(1970);

    const handleMediaFormatChange = mediaFormat => setMediaFormat(mediaFormat);
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

    // TODO: figure out double call
    useEffect(() => {
        setIsLoading(true);
        const getPostersList = async () => {
            let list = [],
                allPages = 1488;
            if (type === 'discover') {
                ({
                    results: list,
                    total_pages: allPages
                } = await api.getDiscover(
                    subtype,
                    undefined,
                    currentPage,
                    selectedYear
                ));
            } else {
                ({
                    results: list,
                    total_pages: allPages
                } = await api.getList(type, subtype, currentPage));
            }
            setPostersList(list);
            setTotalPages(allPages);
            setIsLoading(false);
        };

        getPostersList();
    }, [type, subtype, currentPage, selectedYear]);

    return (
        <ListViewFlexContainer>
            <ControlPanel
                mediaFormats={mediaFormats}
                mediaFormatChangeHandler={handleMediaFormatChange}
                years={years}
                yearsChangeHandler={handleSelectedYearChange}
            />
            {isLoading ? (
                <SpinnerFlexContainer>
                    <Spinner />
                </SpinnerFlexContainer>
            ) : (
                <>
                    <PosterList
                        posters={postersList}
                        type={type === 'discover' ? subtype : type}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageChangeHandler={handlePageChange}
                    />
                </>
            )}
        </ListViewFlexContainer>
    );
}
