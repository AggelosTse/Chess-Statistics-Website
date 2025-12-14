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


export async function getDaysData(name, subOption)      //TA FTIAXNO ME TON TROPO PO EMATHA, SETDATE
{ 
    const currentTime = new Date();

    let startDate = new Date(currentTime);
    startDate.setMonth(startDate.getMonth()- 3);
    
    let fullyearlist = [];

    for(let i=0;i<3;i++)
    {
        const fetchDate = new Date(startDate);
        fetchDate.setMonth(startDate.getMonth() + i);

        let month = fetchDate.getMonth() + 1;      //apo arxiko mina kai meta
        month = padMonth(month);

        const year = fetchDate.getFullYear();           ///xronos paliou mina

        const url = `https://api.chess.com/pub/player/${name}/games/${year}/${month}`;

        fullyearlist.push(
            fetch(url)
                .then(response => response.ok ? response.json() : { games: [] })
                // Handle network errors
                .catch(error => { console.error(`Fetch error for ${url}:`, error); return { games: [] }; })
        );
    }

    const data = await Promise.all(fullyearlist);
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




