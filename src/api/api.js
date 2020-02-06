import { ROOT_URI, API_KEY } from './config';

export const api = {
    getDiscover: async (
        type = 'movie',
        sort_by = 'popularity.desc',
        page = '1',
        year = 2019,
        language = 'en-US',
        adult = 'true',
        video = 'true'
    ) => {
        const year_query =
            type === 'movie' ? `year=${year}` : `first_air_date_year=${year}`;
        const query = `page=${page}&sort_by=${sort_by}&${year_query}&language=${language}&include_adult=${adult}&include_video=${video}&api_key=${API_KEY}`;
        const result = await fetch(`${ROOT_URI}/discover/${type}?${query}`, {
            method: 'GET'
        });
        return await result.json();
    },
    getList: async (type = 'movie', subtype = 'popular', page = '1') => {
        const query = `page=${page}&api_key=${API_KEY}`;
        const result = await fetch(`${ROOT_URI}/${type}/${subtype}?${query}`, {
            method: 'GET'
        });
        return await result.json();
    },
    getEntity: async (type = 'movie', id = 1, language = 'en-US') => {
        const query = `language=${language}&api_key=${API_KEY}`;
        const result = await fetch(`${ROOT_URI}/${type}/${id}?${query}`, {
            method: 'GET'
        });
        return await result.json();;
    }
};
