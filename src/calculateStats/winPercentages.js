
export function winPercentage(dataFile,name)
{
    let wonByCheckmate = 0;
    let wonByResignation = 0;
    let wonByTimeOut = 0;

    let totalwins = 0;

    const finalWinList = [];
    
    for(let i=0;i<dataFile.length;i++) 
    {
        const whiteResult = dataFile[i].white.result;
        const blackResult  = dataFile[i].black.result;

        const whiteName = dataFile[i].white.username;
        const blackName = dataFile[i].black.username;

        if(!whiteResult || !blackResult) continue


        if(whiteName.toLowerCase() === name.toLowerCase())
        {
            if(whiteResult.toLowerCase() === "win")
            {
                if(blackResult.toLowerCase() === "checkmated")
                {
                    wonByCheckmate++;
                    totalwins++;
                }
                else if(blackResult.toLowerCase() === "resigned")
                    {
                        wonByResignation++;
                        totalwins++;
                    }
                else if(blackResult.toLowerCase() === "timeout")
                    {
                        wonByTimeOut++;
                        totalwins++;
                    }    
            }
        }

        else if (blackName.toLowerCase() === name.toLowerCase())
        {
            if(blackResult.toLowerCase() === "win")
                {
                    if(whiteResult.toLowerCase() === "checkmated")
                    {
                        wonByCheckmate++;
                        totalwins++;
                    }
                    else if(whiteResult.toLowerCase() === "resigned")
                        {
                            wonByResignation++;
                            totalwins++;
                        }
                    else if(whiteResult.toLowerCase() === "timeout")
                        {
                             wonByTimeOut++;
                             totalwins++;
                         }  
                }
        }

        
    }
    if(totalwins === 0)
    {
        return [0,0,0,0,0,0];
    }
    

    finalWinList.push(wonByCheckmate,Math.round((wonByCheckmate/totalwins)*100));

    finalWinList.push(wonByResignation,Math.round((wonByResignation/totalwins)*100));

    finalWinList.push(wonByTimeOut,Math.round((wonByTimeOut/totalwins)*100));

    return finalWinList;
}