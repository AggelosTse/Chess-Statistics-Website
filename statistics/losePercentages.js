

export function losePercentage(dataFile,name)
{
    let lostByCheckmate = 0;
    let lostByResignation = 0;
    let lostByTimeOut = 0;

    let losetotal = 0;
    

    const finalLoseList = [];


    for(let i=0;i<dataFile.length;i++) 
    {
        const whiteResult = dataFile[i].white.result;
        const blackResult = dataFile[i].black.result;

        const whiteName = dataFile[i].white.username;
        const blackName = dataFile[i].black.username; 

        if(!whiteResult || !blackResult) continue


        if(whiteName.toLowerCase() === name.toLowerCase())
        {
                if(whiteResult.toLowerCase() === "checkmated")
                {
                    lostByCheckmate++;
                    losetotal++;
                }
                else if(whiteResult.toLowerCase() === "resigned")
                    {
                        lostByResignation++;
                        losetotal++;
                    }
                else if(whiteResult.toLowerCase() === "timeout")
                        {
                            lostByTimeOut++;
                            losetotal++;
                        }    
            
        }

        else if (blackName.toLowerCase() === name.toLowerCase())
        {
                    if(blackResult.toLowerCase() === "checkmated")
                    {
                        lostByCheckmate++;
                        losetotal++;
                    }
                    else if(blackResult.toLowerCase() === "resigned")
                        {
                            lostByResignation++;
                            losetotal++;
                        }
                    else if(blackResult.toLowerCase() === "timeout")
                        {
                             lostByTimeOut++;
                             losetotal++;
                         }  
                
        }

        
    }

    if(losetotal === 0) 
    {
        return [0,0,0,0,0,0];
    }
        
        

    finalLoseList.push(lostByCheckmate,Math.round((lostByCheckmate/losetotal)*100));

    finalLoseList.push(lostByResignation,Math.round((lostByResignation/losetotal)*100));

    finalLoseList.push(lostByTimeOut,Math.round((lostByTimeOut/losetotal)*100));

    return finalLoseList;
}