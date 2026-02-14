import { getDaysData } from "../dataFetching/daysData.js";
import { getMonthsData } from "../dataFetching/monthsData.js";
import { getYearsData } from "../dataFetching/yearsData.js";


export async function getData(name,mainOption,subOption)
{

    const checkurl = `https://api.chess.com/pub/player/${name}`;            //checks if the name exists in the API data

    const checkresponse = await fetch(checkurl);
    if(checkresponse.status !== 200)
    {
        console.log("No player name found. \n");
        return [];
    }


    let data = [];
    switch(mainOption)         
    {
        case "Days":
            {
                data = await getDaysData(name, subOption);      //calculates days
                
                break;
            }
        case "Months":
            {
                data = await getMonthsData(name, subOption);    //calculates months
                break;
            }
        case "Years":
            {
                data = await getYearsData(name, subOption);     //calculates years
                break;
            }
    }




   
    return data;
}
