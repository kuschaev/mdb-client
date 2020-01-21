// Core
import React, { useState, useEffect } from 'react';
// Components
import PosterList from '../PosterList';
import ControlPanel from '../ControlPanel';
// Instruments
import { api } from '../../api/api';
import styled, { keyframes } from 'styled-components';
const rotated = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const LoadingSpinner = styled.div`
    width: 30px;
    height: 30px;
    border: 3px solid #a6a6ff;
    border-top: 4px solid #4f4fff;
    border-radius: 100%;
    margin: auto;
    animation: ${rotated} 1s infinite linear;
    z-index: 1;
`;
const yearsSince1900 = Array(new Date().getFullYear() - 1899)
    .fill()
    .map((_, index) => index + 1900);

function ListView(props) {
    const [mediaFormat, setMediaFormat] = useState('movie');
    const [selectedYear, setYear] = useState(2019);
    const [isLoading, setIsLoading] = useState(true);
    const [postersList, setPostersList] = useState([]);

    const mediaFormats = ['movie', 'tv'];
    const years = yearsSince1900;

    const handleMediaFormatChange = mediaFormat => setMediaFormat(mediaFormat);
    const handleSelectedYearChange = year => setYear(year);

    useEffect(() => {
        setIsLoading(true);
        const getPostersList = async () => {
            const list = await api.getDiscover(
                mediaFormat,
                undefined,
                undefined,
                selectedYear
            );
            setPostersList(list);
            setIsLoading(false);
        };

        getPostersList();
    }, [mediaFormat, selectedYear]);

    return (
        <>
            <ControlPanel
                mediaFormats={mediaFormats}
                mediaFormatChangeHandler={handleMediaFormatChange}
                years={years}
                yearsChangeHandler={handleSelectedYearChange}
            />
            {isLoading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <PosterList posters={postersList} type={mediaFormat} />
            )}
        </>
    );
}

export default ListView;
