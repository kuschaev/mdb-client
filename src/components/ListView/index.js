// Core
import React, { useState, useEffect } from 'react';
// Components
import ControlPanel from '../ControlPanel';
import PosterList from '../PosterList';
import Spinner from '../Spinner';
// Instruments
import { api } from '../../api/api';

const yearsSince1900 = Array(new Date().getFullYear() - 1899)
    .fill()
    .map((_, index) => index + 1900)
    .sort((a, b) => b - a);

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
                <Spinner />
            ) : (
                <PosterList posters={postersList} type={mediaFormat} />
            )}
        </>
    );
}

export default ListView;
