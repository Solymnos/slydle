export const getScore = ({ tries , streak }) =>
{
    let a = (1000 - 50) / Math.log(170);
    let mult = 1 + (0.1 * Math.floor(streak/2))
    if (mult >= 3)
    {
        mult = 3
    }
    let score = 1000 - a * Math.log(tries);
    return Math.ceil(score * mult);
}

export const CompareName = (a, b) =>
{
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
}