export function averageOpponentElo(dataFile,name)
{
    let pl = 0;
    let sum = 0;
    

    for(let i=0;i<dataFile.games.length;i++)
    {
        if(!dataFile.games[i].white.rating || !dataFile.games[i].black.rating) continue


        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            sum += dataFile.games[i].black.rating;
            pl++;
        }
        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            sum += dataFile.games[i].white.rating;
            pl++
        }
       
    }
    if(pl === 0)
    {
        console.log("No opponents found. \n");
        return;
    }
    let average = Math.round(sum/pl);
    
    console.log("Average opponent elo: " + average + "\n");
    return average;
}