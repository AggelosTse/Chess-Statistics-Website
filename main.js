import { writeFile } from "node:fs/promises";


async function getData()
{
    const url = 'https://api.chess.com/pub/player/Aggtsel/games/2024/01';


    const response = await fetch(url);

    if(!response.ok)
    {
        console.error(response.status);
    }

    const dataFile = await response.json();

    await writeFile("./chessPGN.json", JSON.stringify(dataFile, null, 2), "utf8");
  
    return dataFile;
}

function calculateAverageAccuracy(dataFile)
{
    let sum = 0;
    let pl = 0;
  

    for(let i=0; i<dataFile.games.length;i++)
    {
       
        if(!dataFile.games[i].accuracies) continue;

        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].accuracies.white;
            pl++;
        }
        else if(dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].accuracies.black;
            pl++;
        }
    }
    console.log(sum/pl);

}

function calculateSumOfGames(dataFile)
{

    console.log("sum of games: " + dataFile.games.length + "\n");
}

function calculateAverageOpponentElo(dataFile)
{
    let pl = 0;
    let sum = 0;
    

    for(let i=0;i<dataFile.games.length;i++)
    {
        if(!dataFile.games[i].white.rating || !dataFile.games[i].black.rating) continue


        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].black.rating;
            pl++;
        }
        else if (dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].white.rating;
            pl++
        }
       
    }
    console.log("Average opponent elo: " + sum/pl + "\n");
}

function calculateWInPercentage(dataFile)
{
    let wonByCheckmate = 0;
    let wonByResignation = 0;
    let wonByTimeOut = 0;

    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
            {
                if(dataFile.games[i].black.result.toLowerCase() === "checkmated")
                {
                    wonByCheckmate++;
                }
                else if(dataFile.games[i].black.result.toLowerCase() === "resigned")
                    {
                        wonByResignation++;
                    }
                else if(dataFile.games[i].black.result.toLowerCase() === "timeout")
                        {
                            wonByTimeOut++;
                        }    
            }
        }

        else if (dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
                {
                    if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                    {
                        wonByCheckmate++;
                    }
                    else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                        {
                            wonByResignation++;
                        }
                    else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
                        {
                             wonByTimeOut++;
                         }  
                }
        }

        
    }
    console.log("WinCheckmate: " + wonByCheckmate + "\n");
    console.log("WinResignation: " + wonByResignation + "\n");
    console.log("WinTimeout: " + wonByTimeOut + "\n");
}

function calculateDrawPercentage(dataFile)
{
    let drawByStalemate = 0;
    let drawByAgreement = 0;
    let drawByRepetition = 0;
    let drawByInsufficient = 0;
    for(let i=0;i<dataFile.games.length;i++) 
        {
            if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue

            if(dataFile.games[i].black.result.toLowerCase() === "stalemate" || dataFile.games[i].white.result.toLowerCase() === "stalemate")
            {
                drawByStalemate++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "agreed" || dataFile.games[i].white.result.toLowerCase() === "agreed")
            {
                drawByAgreement++;
            }
            else if(dataFile.games[i].black.result.toLowerCase() === "repetition" || dataFile.games[i].white.result.toLowerCase() === "repetition")
                {
                    drawByRepetition++;
                }
            else if(dataFile.games[i].black.result.toLowerCase() === "insufficient" || dataFile.games[i].white.result.toLowerCase() === "insufficient")
                {
                    drawByInsufficient++;
                 }
        }

        console.log("DrawStalemate: " + drawByStalemate + "\n");
        console.log("DrawAgreed: " + drawByAgreement + "\n");
        console.log("DrawRepetition: " + drawByRepetition + "\n");
        console.log("DrawInsufficientMaterial: " + drawByInsufficient + "\n");
}

function calculateLosePercentage(dataFile)
{
    let lostByCheckmate = 0;
    let lostByResignation = 0;
    let lostByTimeOut = 0;

    for(let i=0;i<dataFile.games.length;i++) 
    {
        if(!dataFile.games[i].white.result || !dataFile.games[i].black.result) continue


        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].black.result.toLowerCase() === "win")
            {
                if(dataFile.games[i].white.result.toLowerCase() === "checkmated")
                {
                    lostByCheckmate++;
                }
                else if(dataFile.games[i].white.result.toLowerCase() === "resigned")
                    {
                        lostByResignation++;
                    }
                else if(dataFile.games[i].white.result.toLowerCase() === "timeout")
                        {
                            lostByTimeOut++;
                        }    
            }
        }

        else if (dataFile.games[i].black.username.toLowerCase() === 'aggtsel')
        {
            if(dataFile.games[i].white.result.toLowerCase() === "win")
                {
                    if(dataFile.games[i].black.result.toLowerCase() === "checkmated")
                    {
                        lostByCheckmate++;
                    }
                    else if(dataFile.games[i].black.result.toLowerCase() === "resigned")
                        {
                            lostByResignation++;
                        }
                    else if(dataFile.games[i].black.result.toLowerCase() === "timeout")
                        {
                             lostByTimeOut++;
                         }  
                }
        }

        
    }
    console.log("LoseCheckmate: " + lostByCheckmate + "\n");
    console.log("LoseResign: " + lostByResignation + "\n");
    console.log("LostTimeout: " + lostByTimeOut + "\n");
}


const data = await getData();

calculateAverageAccuracy(data);

calculateSumOfGames(data);

calculateAverageOpponentElo(data);

calculateWInPercentage(data);

calculateDrawPercentage(data);

calculateLosePercentage(data);
