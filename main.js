import { writeFile } from "node:fs/promises";


async function getData()
{
    const url = 'https://api.chess.com/pub/player/ApexChesss/games/2024/01';


    const response = await fetch(url);

    if(!response.ok)
    {
        console.error(response.status);
    }

    const dataFile = await response.json();

    await writeFile("./chessPGN.json", JSON.stringify(dataFile, null, 2), "utf8");
  
    return dataFile;
}

function calculateverageAccuracy(dataFile)
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
        else
        {
            sum += dataFile.games[i].accuracies.black;
            pl++;
        }
    }
    console.log(sum/pl);

}

function calculateSumOfGames(dataFile)
{
    let sumOfGames = 0;
    for(let i=0;i<dataFile.games.length;i++)
    {
        sumOfGames++;
    }
    console.log(sumOfGames);
}

function calculateAverageOpponentElo(dataFile)
{
    let pl = 0;
    let sum = 0;
    for(let i=0;i<dataFile.games.length;i++)
    {
        if(dataFile.games[i].white.username.toLowerCase() === 'aggtsel')
        {
            sum += dataFile.games[i].black.rating;
            pl++;
        }
        else
        {
            sum += dataFile.games[i].white.rating;
            pl++
        }
       
    }
    console.log(sum, sum/pl);
}

function calculateWInPercentage(dataFile)
{
    let winPL = 0;
    let sumOfGames = 0;

    for(let i=0;i<dataFile.games.length;i++) //PROBLEMATIC, ALSO HAS ABANDONED
    {
        sumOfGames++;

        if(dataFile.games[i].result === 'win')
        {
            winPL++;
        }
    }
    console.log((winPL/sumOfGames)*100);
}

const data = await getData();

calculateverageAccuracy(data);

calculateSumOfGames(data);

calculateAverageOpponentElo(data);

calculateWInPercentage(data)