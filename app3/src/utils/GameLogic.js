export const getScore = ({tries, streak}) =>
{
    console.log("tries" + tries)
    console.log("streak" + streak)
    let scoreMax = 1000;
    let mult = 1 + (0.1 * Math.floor(streak/2))
    if (mult >= 3)
    {
        mult = 3
    }
    let score = scoreMax / (1 + Math.log(tries));
    if (tries === -0)
    {
        score = 1000
    }
    console.log(score)
    console.log(mult)
    console.log('dayli score : ' + Math.ceil(score * mult));
    return Math.ceil(score * mult)
}

export const CompareName = (a, b) =>
{
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
}