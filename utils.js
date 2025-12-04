import { getData} from './fetchData.js';
import { makejson} from './resultToJson.js';
import {averageAccuracy} from './statistics/averageAccuracy.js';
import { totalGames } from './statistics/totalGamesPlayed.js';
import { averageOpponentElo } from './statistics/averageOpponentElo.js';
import { winPercentage } from './statistics/winPercentages.js';
import { drawPercentage } from './statistics/drawPercentages.js';
import { losePercentage } from './statistics/losePercentages.js';
import { CommonOpenings } from './statistics/mostCommonOpening.js';
import { streaks } from './statistics/streak.js';
import { averageMoves } from './statistics/averageTotalMoves.js';
import { highestOpponentElo } from './statistics/highestOpponentElo.js';


export async function nextPhase(name,mainOption,subOption)
{
    

    const data = await getData(name,mainOption,subOption);


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

    const results = makejson(accuracy,total,averageOpponElo,highestOppElo,winPerc,drawPerc,losePerc,commonOp,streak,averagMove);


}