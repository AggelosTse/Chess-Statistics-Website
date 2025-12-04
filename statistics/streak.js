

export function streaks(dataFile,name)
{
   let results = [];

   const finalStreaksList = [];

    for(let i=0;i<dataFile.games.length;i++)
    {
        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
            {
                results.push(dataFile.games[i].white.result);
            }
            else if(dataFile.games[i].white.result.toLowerCase() === "stalemate" || dataFile.games[i].white.result.toLowerCase() === "agreed" || dataFile.games[i].white.result.toLowerCase() === "repetition" || dataFile.games[i].white.result.toLowerCase() === "insufficient")
            {
                results.push("draw"); 
            }
            else if(dataFile.games[i].white.result.toLowerCase() === "checkmated" || dataFile.games[i].white.result.toLowerCase() === "resigned" || dataFile.games[i].white.result.toLowerCase() === "timeout")
            {
                results.push("lose");
            }
        }

        else if(dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
                {
                    results.push(dataFile.games[i].black.result);
                }
                else if(dataFile.games[i].black.result.toLowerCase() === "stalemate" || dataFile.games[i].black.result.toLowerCase() === "agreed" || dataFile.games[i].black.result.toLowerCase() === "repetition" || dataFile.games[i].black.result.toLowerCase() === "insufficient")
                {
                    results.push("draw"); 
                }
                else if(dataFile.games[i].black.result.toLowerCase() === "checkmated" || dataFile.games[i].black.result.toLowerCase() === "resigned" || dataFile.games[i].black.result.toLowerCase() === "timeout")
                {
                    results.push("lose");
                }
        }
       
    }

    console.log(results);

    findWinStreak(results);
    findDrawStreak(results);
    findLoseStreak(results);
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

    console.log("All win streaks:", listOfWinCounts);
    console.log("Longest win streak:", Math.max(0, ...listOfWinCounts));
    
    finalStreaksList.push(Math.max(0, ...listOfWinCounts));
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

    console.log("All draw streaks:", listOfDrawCounts);
    console.log("Longest draw streak:", Math.max(0, ...listOfDrawCounts));

    finalStreaksList.push(Math.max(0, ...listOfDrawCounts));

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

    console.log("All lose streaks:", listOfLoseCounts);
    console.log("Longest lose streak:", Math.max(0, ...listOfLoseCounts));

    finalStreaksList.push(Math.max(0, ...listOfLoseCounts));
}





