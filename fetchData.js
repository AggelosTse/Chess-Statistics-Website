export async function getData(name,mainOption,subOption)
{

    const checkurl = `https://api.chess.com/pub/player/${name}`;

    const checkresponse = await fetch(checkurl);
    if(checkresponse.status !== 200)
    {
        console.log("No player name found. \n");
        return;
    }

    const url = `https://api.chess.com/pub/player/${name}/games/2025/11`;

    const response = await fetch(url);
    if(!response.ok)
        {
            console.error("Request failed with status: " +response.status);
            return;
        }

    const data = await response.json();

   
    return data;
}