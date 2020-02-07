const nestedArrayData = [
    [
        { label: 'Discover', type: 'discover', key: 'd' },
        [
            { label: 'Movies', type: 'discover', subtype: 'movie', key: 'dm' },
            { label: 'TV Shows', type: 'discover', subtype: 'tv', key: 'dtv' }
        ]
    ],
    [
        { label: 'Movies', type: 'movie', key: 'm' },
        [
            { label: 'Popular', type: 'movie', subtype: 'popular', key: 'mp' },
            {
                label: 'Top Rated',
                type: 'movie',
                subtype: 'top_rated',
                key: 'mtr'
            },
            {
                label: 'Now Playing',
                type: 'movie',
                subtype: 'now_playing',
                key: 'mnp'
            },
            { label: 'Upcoming', type: 'movie', subtype: 'upcoming', key: 'mu' }
        ]
    ],
    [
        { label: 'TV Shows', type: 'tv', key: 'tv' },
        [
            { label: 'Popular', type: 'tv', subtype: 'popular', key: 'tvp' },
            {
                label: 'Top Rated',
                type: 'tv',
                subtype: 'top_rated',
                key: 'tvtr'
            },
            {
                label: 'On TV',
                type: 'tv',
                subtype: 'on_the_air',
                key: 'tvotr'
            },
            {
                label: 'Airing Today',
                type: 'tv',
                subtype: 'airing_today',
                key: 'tvat'
            }
        ]
    ],
    [
        { label: 'Search', type: 'search', key: 's' },
        [
            { label: 'Movies', type: 'search', subtype: 'movie', key: 'sm' },
            { label: 'TV Shows', type: 'search', subtype: 'tv', key: 'stv' }
            // { label: 'People', type: 'search', subtype: 'person', key: 'sp' },
            // {
            //     label: 'Everything',
            //     type: 'search',
            //     subtype: 'multi',
            //     key: 'smlt'
            // }
        ]
    ]
];

const Navigator = new Map(nestedArrayData);

export default Navigator;
