export function averageOpponentElo(dataFile,name)
{
    let pl = 0;
    let sum = 0;
    
    const searchName = name.toLowerCase();

    for(let i=0;i<dataFile.length;i++)
    {

        const whiteName = dataFile[i]?.white?.username?.toLowerCase();
        const blackName = dataFile[i]?.black?.username?.toLowerCase();


        if(whiteName === searchName)
        {
            const blackRating = dataFile[i]?.black?.rating;
            if(!blackRating) continue;
            sum += blackRating;
            pl++;
            continue;
        }
        else if (blackName === searchName)
        {
            const whiteRating = dataFile[i]?.white?.rating;
            if(!whiteRating) continue;
            sum += whiteRating;
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