import { getData} from './fetchData.js';
import { makejson} from './resultToJson.js';
import {averageAccuracy} from '../calculateStats/averageAccuracy.js';
import { totalGames } from '../calculateStats/totalGamesPlayed.js';
import { averageOpponentElo } from '../calculateStats/averageOpponentElo.js';
import { winPercentage } from '../calculateStats/winPercentages.js';
import { drawPercentage } from '../calculateStats/drawPercentages.js';
import { losePercentage } from '../calculateStats/losePercentages.js';
import { CommonOpenings } from '../calculateStats/mostCommonOpening.js';
import { streaks } from '../calculateStats/streak.js';
import { averageMoves } from '../calculateStats/averageTotalMoves.js';
import { highestOpponentElo } from '../calculateStats/highestOpponentElo.js';
import { maxelo } from '../calculateStats/maxPlayerElo.js';
import { allElos } from '../calculateStats/allPlayerELo.js';


export async function nextPhase(name,mainOption,subOption)
{
    let data = [];

    data = await getData(name,mainOption,subOption);

    const accuracy = averageAccuracy(data,name);            //list, 1st element general,2nd white, 3rd black
    
    const total = totalGames(data);                         //number

    const averageOpponElo = averageOpponentElo(data,name);  //number

    const highestOppElo = highestOpponentElo(data,name);    //list, 1st element elo played, 2nd element elo won

    const winPerc = winPercentage(data,name);  //list, diades apo stixia, tin mia arithmos tin alli pososto

    const drawPerc = drawPercentage(data);      //list, diades apo stixia, tin mia arithmos tin alli pososto

    const losePerc = losePercentage(data,name); //list, diades apo stixia, tin mia arithmos tin alli pososto

    const commonOp = CommonOpenings(data,name);  //list, 1st element NA h mia tripleta apo stixia

    const streak = streaks(data,name);      //list, niki-isopalia-itta

    const averagMove = averageMoves(data,name); //value 

    const maxPlayerElo = maxelo(data,name); //value

    const allelo = allElos(data,name);  //list of elo (for the graph)

    const results = await makejson(accuracy,total,averageOpponElo,highestOppElo,winPerc,drawPerc,losePerc,commonOp,streak,averagMove,maxPlayerElo,allelo);

    return results;

}