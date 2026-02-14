export function streaks(dataFile,name)
{
   let results = [];

   let finalStreaksList = [];

    for(let i=0;i<dataFile.length;i++)
    {
        const whiteName = dataFile[i].white.username;
        const blackName = dataFile[i].black.username;
        
        const whiteResult = dataFile[i].white.result;
        const blackResult = dataFile[i].black.result;


        if(whiteName.toLowerCase() === name.toLowerCase())
        {
            if(whiteResult.toLowerCase() === "win")
            {
                results.push(whiteResult);
            }
            else if(whiteResult.toLowerCase() === "stalemate" || whiteResult.toLowerCase() === "agreed" || whiteResult.toLowerCase() === "repetition" || whiteResult.toLowerCase() === "insufficient")
            {
                results.push("draw"); 
            }
            else if(whiteResult.toLowerCase() === "checkmated" || whiteResult.toLowerCase() === "resigned" || whiteResult.toLowerCase() === "timeout")
            {
                results.push("lose");
            }
        }

        else if(blackName.toLowerCase() === name.toLowerCase())
        {
            if(blackResult.toLowerCase() === "win")
                {
                    results.push(blackResult);
                }
                else if(blackResult.toLowerCase() === "stalemate" || blackResult.toLowerCase() === "agreed" || blackResult.toLowerCase() === "repetition" || blackResult.toLowerCase() === "insufficient")
                {
                    results.push("draw"); 
                }
                else if(blackResult.toLowerCase() === "checkmated" || blackResult.toLowerCase() === "resigned" || blackResult.toLowerCase() === "timeout")
                {
                    results.push("lose");
                }
        }
       
    }

   

    let tempWins = findWinStreak(results);
    let tempDraws = findDrawStreak(results);
    let tempLoses = findLoseStreak(results);

    finalStreaksList.push(tempWins,tempDraws,tempLoses);

    return finalStreaksList;
}

function findWinStreak(results) {
    const listOfWinCounts = [];
    let winCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "win") {
            winCounter++;
        } else if (winCounter > 0) {
            listOfWinCounts.push(winCounter);
            winCounter = 0;
        }
    }

    if (winCounter > 0) listOfWinCounts.push(winCounter);
    
    return Math.max(0, ...listOfWinCounts);
}


function findDrawStreak(results)
{
    const listOfDrawCounts = [];
    let drawCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "draw") {
            drawCounter++;
        } else if (drawCounter > 0) {
            listOfDrawCounts.push(drawCounter);
            drawCounter = 0;
        }
    }

    if (drawCounter > 0) listOfDrawCounts.push(drawCounter);

    return Math.max(0, ...listOfDrawCounts);

}

function findLoseStreak(results)
{
    const listOfLoseCounts = [];
    let loseCounter = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "lose") {
            loseCounter++;
        } else if (loseCounter > 0) {
            listOfLoseCounts.push(loseCounter);
            loseCounter = 0;
        }
    }

    if (loseCounter > 0) listOfLoseCounts.push(loseCounter);

   

    return Math.max(0, ...listOfLoseCounts);
}





