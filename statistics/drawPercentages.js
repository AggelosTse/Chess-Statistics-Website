export function drawPercentage(dataFile)
{
    let drawByStalemate = 0;        
    let drawByAgreement = 0;
    let drawByRepetition = 0;
    let drawByInsufficient = 0;
    
    let drawtotal = 0;


    const finalDrawArray = [];


    for(let i=0;i<dataFile.games.length;i++) 
        {
            if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue

            if(dataFile.games[i].black.result.toLowerCase() === "stalemate")
            {
                drawByStalemate++;
                drawtotal++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "agreed")
            {
                drawByAgreement++;
                drawtotal++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "repetition")
                {
                    drawByRepetition++;
                    drawtotal++;
                }
            else if(dataFile.games[i].black.result.toLowerCase() === "insufficient")
                {
                    drawByInsufficient++;
                    drawtotal++;
                 }
        }
        
        if(drawtotal === 0)
        {
            console.log("no draws found. \n")
            finalDrawArray.push("NA");
            return;
        }


        console.log("Draws By Stalemates: \n");
        console.log(    "Total stalemate draws: " + drawByStalemate + "\n");
        console.log(    "Stalemate draws percentage:: " + Math.round((drawByStalemate/drawtotal)*100) + "\n");

        finalDrawArray.push(drawByStalemate,Math.round((drawByStalemate/drawtotal)*100))

        console.log("Draws By Agreement: \n");
        console.log(    "Total agreement draws: " + drawByAgreement + "\n");
        console.log(    "Agreement draws percentage: " + Math.round((drawByAgreement/drawtotal)*100) + "\n");

        finalDrawArray.push(drawByAgreement,Math.round((drawByAgreement/drawtotal)*100))

        console.log("Draws By Repetition: \n");
        console.log(    "Total repetition draws: " + drawByRepetition + "\n");
        console.log(    "Repetition draws percentage: " + Math.round((drawByRepetition/drawtotal)*100) + "\n");

        finalDrawArray.push(drawByRepetition,Math.round((drawByRepetition/drawtotal)*100))

        console.log("Draws By Insufficient material: \n");
        console.log(    "Total Insufficient material draws: " + drawByInsufficient + "\n");
        console.log(    "Insufficient material draws percentage: " + Math.round((drawByInsufficient/drawtotal)*100) + "\n");

        finalDrawArray.push(drawByInsufficient,Math.round((drawByInsufficient/drawtotal)*100))

        return finalDrawArray;
}