function padMonth(month)
{
    const x = String(month).padStart(2, '0');
    return x;
}



export async function getYearsData(name, subOption)
{
    let fullyearlist = [];

    for(let i=1;i<13;i++)
    {
        const month = padMonth(i);
        const url = `https://api.chess.com/pub/player/${name}/games/${subOption}/${month}`;

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