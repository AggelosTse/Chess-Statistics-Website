

export function losePercentage(dataFile,name)
{
    let lostByCheckmate = 0;
    let lostByResignation = 0;
    let lostByTimeOut = 0;

    let losetotal = 0;
    

    const finalLoseList = [];


    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
                if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                {
                    lostByCheckmate++;
                    losetotal++;
                }
                else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                    {
                        lostByResignation++;
                        losetotal++;
                    }
                else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
                        {
                            lostByTimeOut++;
                            losetotal++;
                        }    
            
        }

        else if (dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
                    if(dataFile.games[i].black.result.toLowerCase() === "checkmated")
                    {
                        lostByCheckmate++;
                        losetotal++;
                    }
                    else if(dataFile.games[i].black.result.toLowerCase() === "resigned")
                        {
                            lostByResignation++;
                            losetotal++;
                        }
                    else if(dataFile.games[i].black.result.toLowerCase() === "timeout")
                        {
                             lostByTimeOut++;
                             losetotal++;
                         }  
                
        }

        
    }

    if(losetotal === 0) 
    {
        console.log("No loses found. \n");
        finalLoseList.push("NA");
        return;
    }
        
        
    console.log("Loses By Checkmates: \n");
    console.log(    "Total checkmate loses: " + lostByCheckmate + "\n");
    console.log(    "Checkmate loses percentage: " + Math.round((lostByCheckmate/losetotal)*100) + "\n");

    finalLoseList.push(lostByCheckmate,Math.round((lostByCheckmate/losetotal)*100));

    console.log("Loses By Resignation: \n");
    console.log(    "Total Resignation loses: " + lostByResignation + "\n");
    console.log(    "Resignation loses percentage: " + Math.round((lostByResignation/losetotal)*100) + "\n");

    finalLoseList.push(lostByResignation,Math.round((lostByResignation/losetotal)*100));

    console.log("Loses By timeout: \n");
    console.log(    "Total timeout loses: " + lostByTimeOut + "\n");
    console.log(    "Timeout loses percentage: " + Math.round((lostByTimeOut/losetotal)*100) + "\n");

    finalLoseList.push(lostByTimeOut,Math.round((lostByTimeOut/losetotal)*100));

    return finalLoseList;
}