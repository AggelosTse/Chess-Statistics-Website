
export function averageMoves(dataFile,name)
{
    let sumWhiteMoves = 0;
    let sumBlackMoves = 0;

    let listOfTotalMoves = [];

    const moveRegex = /[KQRNB]?[a-h]?[1-8]?[x-]?[a-h][1-8](?:=[QRNB])?|O-O(?:-O)?/g;

    for(let i=0;i<dataFile.games.length;i++)
    {
        const movesOnly = dataFile.games[i].pgn

            .replace(/\[.*?\]/gs, '')              // Remove headers
            .replace(/\{.*?\}|\(.*?\)|\$\d+/g, '') // Remove comments and variations
            .replace(/\d+\.(\.\.)?/g, '')          // Remove move numbers
            .replace(/\s*[10]\s*-\s*[10]\s*/g, '') // Remove results
            .trim();


        const moves = movesOnly.match(moveRegex);

        if(!moves) continue;

        if(dataFile.games[i].white.username.toLowerCase() === name.toLowerCase())
        {
            for(let j=0;j<moves.length;j+=2)
            {
                sumWhiteMoves++;
                
            }
            listOfTotalMoves.push(sumWhiteMoves);
            sumWhiteMoves = 0;
        }
        else if(dataFile.games[i].black.username.toLowerCase() === name.toLowerCase())
        {
            for(let j=1;j<moves.length;j+=2)
                {
                    sumBlackMoves++;
                }
                listOfTotalMoves.push(sumBlackMoves);
                sumBlackMoves = 0;
        }
        
    }

   
    listOfTotalMoves.sort((a,b) => a - b);
    

    const mid = Math.floor(listOfTotalMoves.length / 2);
    let median;
    
    if (listOfTotalMoves.length % 2 === 0) {
  
      median = (listOfTotalMoves[mid - 1] + listOfTotalMoves[mid]) / 2;
    } else {
     
      median = listOfTotalMoves[mid];
    }

    console.log("Average Ammount of moves per game: " + median.toFixed(0));

    return median.toFixed(0);
}

