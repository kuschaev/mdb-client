const getYearsSinceArray = (yearSince = 1900) =>
    Array(new Date().getFullYear() - (yearSince - 1))
        .fill()
        .map((_, index) => index + yearSince)
        .sort((a, b) => b - a);

export default getYearsSinceArray;
