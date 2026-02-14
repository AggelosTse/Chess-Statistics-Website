import { getDaysData } from "../dataFetching/daysData.js";
import { getMonthsData } from "../dataFetching/monthsData.js";
import { getYearsData } from "../dataFetching/yearsData.js";

export async function getData(name, mainOption, subOption) {
  try {
    const checkurl = `https://api.chess.com/pub/player/${name}`; //checks if the name exists in the API data

    const checkresponse = await fetch(checkurl);
    if (!checkresponse.ok) {
      throw new Error("invalid name");
      
    }

    let data = [];
    switch (mainOption) {
      case "Days": {
        data = await getDaysData(name, subOption); //calculates days

        break;
      }
      case "Months": {
        data = await getMonthsData(name, subOption); //calculates months
        break;
      }
      case "Years": {
        data = await getYearsData(name, subOption); //calculates years
        break;
      }
    }
    if(!Array.isArray(data)){ //check if the list of games is an array
      throw new Error("games list");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
