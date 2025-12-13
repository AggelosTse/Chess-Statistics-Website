export function averageOpponentElo(dataFile,name)
{
    let pl = 0;
    let sum = 0;
    

    for(let i=0;i<dataFile.length;i++)
    {
        if(!dataFile[i].white.rating || !dataFile[i].black.rating) continue;

        const whiteRating = dataFile[i].white.rating;
        const blackRating = dataFile[i].black.rating;

        const whiteName = dataFile[i].white.username;
        const blackName = dataFile[i].black.username;


        if(whiteName.toLowerCase() === name.toLowerCase())
        {
            sum += blackRating;
            pl++;
        }
        else if (blackName.toLowerCase() === name.toLowerCase())
        {
            sum += whiteName;
            pl++
        }
       
    }
    if(pl === 0)
    {
        return 0;
    }
    
    let average = Math.round(sum/pl);       //TO ALLAZO SE MEDIAN ANTI GIA MEAN
    
    return average;
}