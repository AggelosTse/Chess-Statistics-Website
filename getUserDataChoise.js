function padMonth(month)
{
    const x = String(month).padStart(2, '0');
    return x;
}


export async function getDaysData(name, subOption)
{
    let responses;

    
    
    const currentTime = new Date();

    const currentMonth = currentTime.getMonth() + 1;
    const currentDay = currentTime.getDay();
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

    switch(subOption)
        {
            
            case 1:
                let priorDate = new Date(new Date().setDate(currentTime.getDate() - 1));
                let priorDateTimestamp = priorDate.getTime() / 1000;  //se seconds, etsi ta exei to api
                for(let i=0;i<allGames.length;i++)
                {
                    if(allGames[i].end_time >= priorDateTimestamp)
                    {
                        finalListOfGames.push(allGames[i]);
                    }
                }
                return finalListOfGames;
             


            case 3:
                break;
            case 7:
                break;
            case 14:
                break;
            case 30:
                break;
        }
            
}

export async function getMonthsData(subOption)
{
    
}

export async function getYearsData(subOption)
{
    
}

