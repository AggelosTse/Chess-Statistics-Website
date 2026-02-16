export function CommonOpenings(dataFile, name) {
    if (!dataFile || !name) return ["NA", 0, 0, "NA", 0, 0];

    const searchName = name.toLowerCase();
    const whiteMap = new Map();
    const blackMap = new Map();

    const moveRegex = /[KQRNB]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRNB])?[+#]?|O-O(?:-O)?/g;

    for (let i = 0; i < dataFile.length; i++) {
        const game = dataFile[i];
        const pgn = game?.pgn;
        if (!pgn) continue;

        const moveStart = pgn.lastIndexOf(']') + 1;
        const movesOnly = pgn.slice(moveStart);
        const moves = movesOnly.match(moveRegex);

        if (!moves || moves.length < 4) continue;

        const isWhite = game.white?.username?.toLowerCase() === searchName;
        const isBlack = game.black?.username?.toLowerCase() === searchName;
        
        if (!isWhite && !isBlack) continue;

        const user = isWhite ? game.white : game.black;
        const opening = moves.slice(0, 4).join(' ');
        const isWin = user?.result?.toLowerCase() === 'win' ? 1 : 0;

        const targetMap = isWhite ? whiteMap : blackMap;
        const stats = targetMap.get(opening) || { count: 0, wins: 0 };
        
        stats.count++;
        stats.wins += isWin;
        targetMap.set(opening, stats);
    }

    const getTopStats = (map) => {
        if (map.size === 0) return ["NA", 0, 0];
        
        let topOpening = "";
        let topData = { count: -1, wins: 0 };

        for (const [opening, data] of map) {
            if (data.count > topData.count) {
                topOpening = opening;
                topData = data;
            }
        }

        const winRate = Math.round((topData.wins / topData.count) * 100);
        return [topOpening, topData.count, winRate];
    };

    return [...getTopStats(whiteMap), ...getTopStats(blackMap)];
}