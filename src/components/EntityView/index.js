// Core
import React, { useEffect, useState } from 'react';
// Components
import PosterCard from '../PosterCard';
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

function EntityView({ history, location, match }) {
    const { type, id } = match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [currentItem, setCurrentItem] =  useState({});

    useEffect(() => {
        setIsLoading(true);
        const getCurrentItem  = async () => {
            const item = await api.getEntity(type, id);
            setCurrentItem(item);
            setIsLoading(false);
        };
        getCurrentItem();
    }, [type, id]);

    return isLoading ? <LoadingSpinner></LoadingSpinner> : <PosterCard {...currentItem} />;
}

export default EntityView;
