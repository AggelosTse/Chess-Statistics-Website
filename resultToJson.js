export async function makejson(accuracy,total,averageOpponElo,highestOppElo,winPerc,drawPerc,losePerc,commonOp,streak,averagMove,maxPlayerElo,allelo)
{
    const statistics = {

        "GeneralAverageAccuracy" : accuracy[0],
        "WhiteAverageAccuracy" : accuracy[1],
        "BlackAverageAccuracy" : accuracy[2],

        "totalGames" : total,

        "averageOpponentElo" : averageOpponElo,

        "highestOpponentEloPlayed" : highestOppElo[0],
        "highestOpponentEloWon" : highestOppElo[1],

        "wonByCheckMate": winPerc[0],
        "wonByCheckmatePercentage" : winPerc[1],
        "wonByResignation": winPerc[2], 
        "wonByResignationPercentage" : winPerc[3],
        "wonByTimeout" : winPerc[4],
        "wonByTimeoutPercentage": winPerc[5],

        "drawByStalemate" : drawPerc[0],
        "drawByStalematePercentage" : drawPerc[1],
        "drawByAgreement" : drawPerc[2],
        "drawByAgreementPercentage" : drawPerc[3],
        "drawByRepetition" : drawPerc[4],
        "drawByRepetitionPercentage" : drawPerc[5],
        "drawByInsufficient" : drawPerc[6],
        "drawByInsufficientPercentage" : drawPerc[7],

        "loseByCheckmates" : losePerc[0],
        "loseByCheckmatesPercentage" : losePerc[1],
        "loseByResignation" : losePerc[2],
        "loseByResignationPercentage" : losePerc[3],
        "loseByTimeout" : losePerc[4],
        "loseByTimeoutPercentage" : losePerc[5],

        "WhiteMostCommonOpening" : commonOp[0],
        "WhiteCommonOpeningCounter" : commonOp[1],
        "WhiteCommonOpeningWinrate" : commonOp[2],
        "BlackMostCommonOpening" : commonOp[3],
        "BlackCommonOpeningCounter" : commonOp[4],
        "BlackCommonOpeningWinrate" : commonOp[5],

        "WinStreak" : streak[0],
        "DrawStreak" : streak[1],
        "LoseStreak" : streak[2],
        
        "AverageSumOfMoves " : averagMove,

        "maxPlayerElo" : maxPlayerElo,

        "allElo" : allelo
    }
    return statistics;
}