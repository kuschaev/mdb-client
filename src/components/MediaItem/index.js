// Core
import React from 'react';
// Instruments
import styled from 'styled-components';
import { BASE_IMAGE_URL } from '../../api/config';

const MediaItemContainer = styled.div`
    margin: 16px 0 16px 0;
    padding: 20px;
    height: 500px;
    background-image: radial-gradient(
            circle at 20% 50%,
            rgba(12.94%, 14.9%, 22.75%, 0.98) 0%,
            rgba(20.39%, 22.35%, 29.02%, 0.88) 100%
        ),
        url(${props => props.bg_url});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-flow: row nowrap;
`;
const PosterImageContainer = styled.div`
    height: 450px;
`;
const PosterImage = styled.img`
    height: 100%;
    border-radius: 2%;
`;
const InfoContainer = styled.div`
    padding: 0 20px 10px 30px;
    display: flex;
    flex-flow: column nowrap;
`;
const MediaTitle = styled.h2`
    margin: 0 0 5px 0;
    font-size: 1.4em;
    color: #f0f0f0;
`;
const Year = styled.span`
    font-size: 0.8em;
    color: #9a9a9a;
`;
const Overview = styled.p`
    font-size: 0.9em;
    color: #d0d0d0;
`;

const MediaItem = props => {
    const {
        type,
        backdrop_path,
        poster_path,
        title,
        name,
        release_date,
        first_air_date,
        last_air_date,
        overview
    } = props;
    const imageSize = '/w500';
    const image_full_url = BASE_IMAGE_URL + imageSize + poster_path;
    // TODO: add fallback image
    const alt_src = '';
    const bgSize = '/w780';
    const bg_full_url = BASE_IMAGE_URL + bgSize + backdrop_path;
    const year = new Date(release_date).getFullYear();
    const first_year = new Date(first_air_date).getFullYear();
    const last_year = new Date(last_air_date).getFullYear();
    return (
        <>
            <MediaItemContainer bg_url={bg_full_url}>
                <PosterImageContainer>
                    <PosterImage
                        src={image_full_url}
                        alt={alt_src}
                    ></PosterImage>
                </PosterImageContainer>
                <InfoContainer>
                    <MediaTitle>{title || name}</MediaTitle>
                    <Year>
                        {type === 'movie'
                            ? `(${year})`
                            : `(${first_year} - ${last_year})`}
                    </Year>
                    <Overview>{overview}</Overview>
                </InfoContainer>
            </MediaItemContainer>
        </>
    );
};

export default MediaItem;
