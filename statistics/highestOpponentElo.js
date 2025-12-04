
export function highestOpponentElo(dataFile,name)
{

    let listOfHighestElo = [];
    let listOfHighestEloWon = [];

    const highestopplist = [];

    for(let i=0;i<dataFile.games.length;i++)
    {
        if(!dataFile.games[i].white || !dataFile.games[i].black) continue;

        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].white.result === "win")
            {
                listOfHighestEloWon.push(dataFile.games[i].black.rating);   
            }
            listOfHighestElo.push(dataFile.games[i].black.rating);  
            
        }
        else if(dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
            {
                if(dataFile.games[i].black.result === "win")
                {
                    listOfHighestEloWon.push(dataFile.games[i].white.rating);   
                }
                listOfHighestElo.push(dataFile.games[i].white.rating);  
                
            }
            
    }
    
    console.log("Opponent wit the most elo you've played: " + Math.max(0, ...listOfHighestElo));
    console.log("Opponent with the most elo you've won: " + Math.max(0, ...listOfHighestEloWon));

    highestopplist.push(Math.max(0, ...listOfHighestElo),Math.max(0, ...listOfHighestEloWon));
    return highestopplist;
}