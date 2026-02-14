export async function getDaysData(name, subOption) {
    try{

    const now = new Date();     //storing the date now

    const priorDate = new Date(now);
    priorDate.setUTCDate(now.getUTCDate() - subOption);     //storing the date "suboption" days before
    priorDate.setUTCHours(0, 0, 0, 0);                      //this helps the confusion between midnight change of hour
    const priorDateTimestamp = Math.floor(priorDate.getTime() / 1000);  //taking the timestamp, (chess.com format)

    const fetchPromises = [];
    let iterateDate = new Date(priorDate);
    iterateDate.setUTCDate(1); 

    while (iterateDate <= now) {
        const year = iterateDate.getUTCFullYear();
        const month = String(iterateDate.getUTCMonth() + 1).padStart(2, '0');
        const url = `https://api.chess.com/pub/player/${name}/games/${year}/${month}`;      //hitting the API with the correct data

        fetchPromises.push(
            fetch(url)
                .then(res => res.ok ? res.json() : { games: [] })
                .catch(() => {
                    throw new Error("fetching data");
                })                                  //pushing the response of the server in the fetchpromises list
        );

        // Move to the next month
        iterateDate.setUTCMonth(iterateDate.getUTCMonth() + 1);
    }

    // 3. Flatten, Filter, and Sort
    const monthlyData = await Promise.all(fetchPromises);
    const allGames = monthlyData.flatMap(m => m.games || []);       //processing the list and sorting it
    
    return allGames
        .filter(game => game.end_time >= priorDateTimestamp)
        .sort((a, b) => b.end_time - a.end_time);
}catch(error){
    throw error;
}
}