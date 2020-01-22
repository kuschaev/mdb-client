// Core
import React, { useEffect, useState } from 'react';
// Components
import MediaItem from '../MediaItem';
import Spinner from '../Spinner';
// Instruments
import { api } from '../../api/api';

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

    return isLoading ? <Spinner /> : <MediaItem type={type} {...currentItem} />;
}

export default ItemView;
