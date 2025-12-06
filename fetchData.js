import { getDaysData,getMonthsData,getYearsData } from "./getUserDataChoise";

export async function getData(name,mainOption,subOption)
{

    const checkurl = `https://api.chess.com/pub/player/${name}`;

    const checkresponse = await fetch(checkurl);
    if(checkresponse.status !== 200)
    {
        console.log("No player name found. \n");
        return;
    }


    switch(mainOption)         //[1, 3, 7, 14, 21, 30];
    {
        case "Days":
            {
                data = await getDaysData(name, subOption);
            }
        case "Months":
            {
                data = await getMonthsData(name, subOption);
            }
        case "Years":
            {
                data = await getYearsData(name, subOption);
            }
    }




   
    return data;
}