// Core
import React, { useEffect, useState } from 'react';
// Components
import MediaItem from '../../components/MediaItem';
import Spinner from '../../components/Spinner';
// Instruments
import { api } from '../../api/api';
import styled from 'styled-components';

const ItemViewFlexContainer = styled.div`
    flex: 1;
`;
const SpinnerFlexContainer = styled.div`
    height: calc(100vh - 136px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ItemView({ history, location, match }) {
    const { type, id } = match.params;

    const [isLoading, setIsLoading] = useState(true);
    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
        setIsLoading(true);
        const getCurrentItem = async () => {
            const item = await api.getEntity(type, id);
            setCurrentItem(item);
            setIsLoading(false);
        };
        getCurrentItem();
    }, [type, id]);

    return (
        <ItemViewFlexContainer>
            {isLoading ? (
                <SpinnerFlexContainer>
                    <Spinner />
                </SpinnerFlexContainer>
            ) : (
                <MediaItem type={type} {...currentItem} />
            )}
        </ItemViewFlexContainer>
    );
}

export default ItemView;
