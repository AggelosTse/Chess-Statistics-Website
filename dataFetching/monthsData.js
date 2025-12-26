
export async function getMonthsData(name, subOption) {
    const validOptions = [1, 2, 3, 6, 9, 12];
    if (!validOptions.includes(subOption)) return [];       //checks for valid user input

    const now = new Date();         //gets the current time
    
 
    const cutoffDate = new Date(now);           
    cutoffDate.setMonth(now.getMonth() - subOption);    //gets the time "suboption" months before
    const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);    //formats the time to match the API data

 
    const fetchPromises = [];
    let iterateDate = new Date(cutoffDate);

    iterateDate.setDate(1);

    while (iterateDate <= now) {
        const year = iterateDate.getFullYear();
        const month = String(iterateDate.getMonth() + 1).padStart(2, '0');      //formats month 1 -> 01 for the API
        const url = `https://api.chess.com/pub/player/${name}/games/${year}/${month}`;  //calls the API

        fetchPromises.push(             //keeps the responses in fetchpromises list
            fetch(url)
                .then(res => res.ok ? res.json() : { games: [] })
                .catch(() => ({ games: [] }))
        );

        iterateDate.setMonth(iterateDate.getMonth() + 1);
    }

    const data = await Promise.all(fetchPromises);
    
   
    return data                 //filters and sorts the list
        .flatMap(m => m.games || [])
        .filter(game => game.end_time >= cutoffTimestamp)
        .sort((a, b) => b.end_time - a.end_time);
}