function padMonth(month)
{
    const x = String(month).padStart(2, '0');
    return x;
}


export async function getMonthsData(name, subOption)
{

    let list = [];
    switch(subOption)
    {
        case 1:
            list = await getDifferentMonths(name,subOption);
            break;
        case 2:
            list = await getDifferentMonths(name,subOption);
            break;
        case 3:
            list = await getDifferentMonths(name,subOption);
            break;
        case 6:
            list = await getDifferentMonths(name,subOption);
            break;
        case 9:
            list = await getDifferentMonths(name,subOption);
            break;
        case 12:
            list = await getDifferentMonths(name,subOption);
            break;
    } 
   return list;
}


async function getDifferentMonths(name,subOption)
{
    const currentTime = new Date();                 //TORINA

    let startDate = new Date(currentTime);          //ARXIKA
    startDate.setMonth(startDate.getMonth()-(subOption - 1));



    let fullyearlist = [];

    for(let i=0;i<subOption;i++)
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
    console.log(allGames);
    return allGames;
}