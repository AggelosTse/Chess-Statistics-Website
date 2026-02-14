
export function highestOpponentElo(dataFile,name)
{

    if (!Array.isArray(dataFile)) return [0,0];
    

    let listOfHighestElo = [];
    let listOfHighestEloWon = [];

    const highestopplist = [];

    for(let i=0;i<dataFile.length;i++)
    {

        if(!dataFile[i].white || !dataFile[i].black) continue;

        const whiteResult = dataFile[i].white.result;
        const blackResult = dataFile[i].black.result;
    
        const whiteRating = dataFile[i].white.rating;
        const blackRating = dataFile[i].black.rating;
    
        const whiteName = dataFile[i].white.username;
        const blackName = dataFile[i].black.username;


        if(whiteName.toLowerCase() === name.toLowerCase())
        {
            if(whiteResult === "win")
            {
                listOfHighestEloWon.push(blackRating);   
            }
            listOfHighestElo.push(blackRating);  
            
        }
        else if(blackName.toLowerCase() === name.toLowerCase())
            {
                if(blackResult === "win")
                {
                    listOfHighestEloWon.push(whiteRating);   
                }
                listOfHighestElo.push(whiteRating);  
                
            }
            
    }
    
   
    highestopplist.push(Math.max(0, ...listOfHighestElo),Math.max(0, ...listOfHighestEloWon));
    return highestopplist;
}