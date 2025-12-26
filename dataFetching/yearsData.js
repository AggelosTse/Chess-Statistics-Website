export async function getYearsData(name, subOption) {
 
    const yearToFetch = parseInt(subOption);
    if (!yearToFetch || !name) return [];           //check for valid input

    const now = new Date();                     //date calculations 
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1; // 1-indexed


    const maxMonth = (yearToFetch === currentYear) ? currentMonth : 12;     //if uses wants this year, 
    //the max Month should be the current month. Else, take the whole 12 months

    const fetchPromises = [];

    for (let i = 1; i <= maxMonth; i++) {
        const month = String(i).padStart(2, '0');       //pads month 1 -> 01 for the API
        const url = `https://api.chess.com/pub/player/${name}/games/${yearToFetch}/${month}`;       //fetches the API
        
        fetchPromises.push(         //stores the responses in a list
            fetch(url)
                .then(res => res.ok ? res.json() : { games: [] })
                .catch(err => {
                    console.warn(`Skipping ${month}/${yearToFetch}:`, err);
                    return { games: [] };
                })
        );
    }

    const data = await Promise.all(fetchPromises);
    

    return data                     //filters and sorts list with games
        .flatMap(m => m.games || [])
        .sort((a, b) => b.end_time - a.end_time);
}