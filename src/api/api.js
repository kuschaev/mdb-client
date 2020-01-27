import { ROOT_URI, API_KEY } from './config';

export const api = {
    getDiscover: async (
        type = 'movie',
        page = '1',
        sort_by = 'popularity.desc',
        year = 2019,
        language = 'en-US',
        adult = 'true',
        video = 'true'
    ) => {
        const year_query = type === 'movie' ? `year=${year}` : `first_air_date_year=${year}`;
        const query = `page=${page}&sort_by=${sort_by}&${year_query}&language=${language}&include_adult=${adult}&include_video=${video}&api_key=${API_KEY}`;
        const result = await fetch(`${ROOT_URI}/discover/${type}?${query}`, {
            method: 'GET'
        });
        const { results: listItems } = await result.json();
        return listItems;
    },
    getList: async (type = 'movie', subtype = 'popular', page = '1') => {
        const query = `page=${page}&api_key=${API_KEY}`;
        const result = await fetch(`${ROOT_URI}/${type}/${subtype}?${query}`, {
            method: 'GET'
        });
        const { results: listItems } = await result.json();
        return listItems;
    },
    getEntity: async (type = 'movie', id = 1, language = 'en-US') => {
        const result = await fetch(
            `${ROOT_URI}/${type}/${id}?api_key=${API_KEY}&language=${language}`,
            {
                method: 'GET'
            }
        );
        const entity = await result.json();
        return entity;
    }
};
