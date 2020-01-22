import { ROOT_URI, API_KEY } from './config';

export const api = {
    getDiscover: async (
        type = 'movie',
        language = 'en-US',
        sort_by = 'popularity.desc',
        year = 2019,
        adult = 'true',
        video = 'true',
        page = '1'
    ) => {
        const year_query = type === 'movie' ? `year=${year}`: `first_air_date_year=${year}`;
        const query = `api_key=${API_KEY}&language=${language}&sort_by=${sort_by}&${year_query}&include_adult=${adult}&include_video=${video}&page=${page}`;
        const result = await fetch(`${ROOT_URI}/discover/${type}?${query}`, {
            method: 'GET'
        });
        const { results: listItems } = await result.json();
        return listItems;
    },
    getEntity: async (type = 'movie', id = 1, language = 'en-US') => {
        const result = await fetch(`${ROOT_URI}/${type}/${id}?api_key=${API_KEY}&language=${language}`, {
            method: 'GET'
        });
        const entity = await result.json();
        return entity;
    }
};
