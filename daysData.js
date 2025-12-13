function padMonth(month)
{
    const x = String(month).padStart(2, '0');
    return x;
}

function getDifferentDays(allGames,currentTime ,dayoption)
{
    const tempList = [];

    let priorDate = new Date(currentTime);
    priorDate.setDate(currentTime.getDate() - dayoption);
    
    // 2. CRITICAL FIX: Zero out the time components to set the cutoff to midnight (00:00:00)
    priorDate.setHours(0, 0, 0, 0);


   let priorDateTimestamp = Math.floor(priorDate.getTime() / 1000); //se seconds, etsi ta exei to api

   for(let i=0;i<allGames.length;i++)
   {
       if(allGames[i].end_time >= priorDateTimestamp)
       {
        tempList.push(allGames[i]);
       }
      
   }
   return tempList;
}


export async function getDaysData(name, subOption)
{
    let responses;

    
    
    const currentTime = new Date();

    const currentMonth = currentTime.getMonth() + 1;
    const currentYear = currentTime.getFullYear();

    if(currentMonth === 1)      //january
    {
             responses = await Promise.all([
            fetch(`https://api.chess.com/pub/player/${name}/games/${currentYear}/01`),
            fetch(`https://api.chess.com/pub/player/${name}/games/${currentYear-1}/12`)
            
            
          ]);
    }
    else if(currentMonth !== 1)
    {

        const month = padMonth(currentMonth)
        const prev = currentMonth - 1;
        const previousMonth = padMonth(prev);

             responses = await Promise.all([
            fetch(`https://api.chess.com/pub/player/${name}/games/${currentYear}/${month}`),
            fetch(`https://api.chess.com/pub/player/${name}/games/${currentYear}/${previousMonth}`)
        
        
      ]);
    }



    const data = await Promise.all(responses.map(responses => responses.json()));
    let allGames = data.flatMap(month => month.games || []);
    
    allGames = allGames.sort((a, b) => b.end_time - a.end_time);
    


   
    let finalListOfGames = [];

    
    const subOptionList = [1,3,7,14,21,30];

    if(subOptionList.includes(subOption))
    {
        finalListOfGames = getDifferentDays(allGames, currentTime, subOption);
        return finalListOfGames;
    }
    else
    {
        return [];
    }
}


export async function getYearsData(subOption)
{
    
}

