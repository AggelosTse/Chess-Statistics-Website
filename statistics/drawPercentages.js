export function drawPercentage(dataFile)
{
    let drawByStalemate = 0;        
    let drawByAgreement = 0;
    let drawByRepetition = 0;
    let drawByInsufficient = 0;
    
    let drawtotal = 0;


    const finalDrawArray = [];


    for(let i=0;i<dataFile.length;i++) 
        {
            const whiteResult = dataFile[i].white.result;
            const blackResult = dataFile[i].black.result;


            if(!whiteResult || !blackResult) continue

            if(whiteResult.toLowerCase() === "stalemate" || blackResult.toLowerCase() === "stalemate")
            {
                drawByStalemate++;
                drawtotal++;
            }
            else if(whiteResult.toLowerCase() === "agreed" || blackResult.toLowerCase() === "agreed")
            {
                drawByAgreement++;
                drawtotal++;
            }
            else if(whiteResult.toLowerCase() === "repetition" || blackResult.toLowerCase() === "repetition")
                {
                    drawByRepetition++;
                    drawtotal++;
                }
            else if(whiteResult.toLowerCase() === "insufficient" || blackResult.toLowerCase() === "insufficient")
                {
                    drawByInsufficient++;
                    drawtotal++;
                 }
        }
        
        if(drawtotal === 0)
        {
            return [0,0,0,0,0,0,0,0];
        }


      

        finalDrawArray.push(drawByStalemate,Math.round((drawByStalemate/drawtotal)*100));

        finalDrawArray.push(drawByAgreement,Math.round((drawByAgreement/drawtotal)*100));

        finalDrawArray.push(drawByRepetition,Math.round((drawByRepetition/drawtotal)*100));

        finalDrawArray.push(drawByInsufficient,Math.round((drawByInsufficient/drawtotal)*100));

        return finalDrawArray;
}