// Core
import React from 'react';
// Instruments
import { BASE_IMAGE_URL } from '../../api/config';
import styled from 'styled-components';

const PosterCardContainer = styled.div`
    margin: 16px;
    height: 300px;
    outline: 1px solid #dadadada;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-flow: row nowrap;
    &:hover {
        outline: 1px solid #808080;
        box-shadow: none;
    }
`;
const PosterImageContainer = styled.div`
    height: 300px;
    width: 200px;
    overflow: hidden;
    cursor: pointer;
`;
const PosterImage = styled.img`
    height: 100%;
`;
const PosterInfoContainer = styled.div`
    padding: 10px;
    width: 240px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;
const Title = styled.h3`
    font-size: 1.1em;
    color: #000;
`;
const Description = styled.p`
    font-size: 0.9em;
    color: #4d4d4d;
`;

const PosterCard = ({ title, name, poster_path, overview}) => {
    const imageSize = '/w500';
    const image_full_url = BASE_IMAGE_URL + imageSize + poster_path;
    // TODO: add fallback image
    const alt_src = '';
    const truncatedOverview = overview.length < 220 ? overview :
        `${overview.substring(0, 218).split(' ').slice(0, -1).join(' ')}...`;

    return (
        <PosterCardContainer>
            <PosterImageContainer>
                <PosterImage src={image_full_url} alt={alt_src} />
            </PosterImageContainer>
            <PosterInfoContainer>
                <Title>{title || name}</Title>
                <Description>
                    {truncatedOverview}
                </Description>
            </PosterInfoContainer>
        </PosterCardContainer>
    );
}

export default PosterCard;
