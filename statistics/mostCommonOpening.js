
export function CommonOpenings(dataFile,name) {
    
    const usernameLower = name.toLowerCase();

    const finalOpeningList = [];

    // Maps to count openings and wins/losses
    const whiteOpenings = new Map(); // key: opening string, value: { count, wins, draws, losses }
    const blackOpenings = new Map();

    // Regex to match moves (simplified but works for standard algebraic notation)
    const moveRegex = /[KQRNB]?[a-h]?[1-8]?[x-]?[a-h][1-8](?:=[QRNB])?|O-O(?:-O)?/g;

    for (const game of dataFile) {
        if (!game.pgn) continue;

        // Clean PGN: remove headers, comments, move numbers, result markers
        const movesOnly = game.pgn
            .replace(/\[.*?\]/gs, '')              // Remove headers
            .replace(/\{.*?\}|\(.*?\)|\$\d+/g, '') // Remove comments and variations
            .replace(/\d+\.(\.\.)?/g, '')          // Remove move numbers
            .replace(/\s*[10]\s*-\s*[10]\s*/g, '') // Remove results
            .trim();

        const moves = movesOnly.match(moveRegex);
        if (!moves || moves.length < 4) continue; // Need at least 4 half-moves

        // Helper function to normalize result
        const normalizeResult = (res) => {
            res = res.toLowerCase();
            if (res === 'win') return 'win';
            else if (['stalemate', 'agreed', 'repetition', 'insufficient', 'draw'].includes(res)) return 'draw';
            else return 'lose';
        };

        // --- White analysis ---
        if (game.white.username.toLowerCase() === usernameLower) {
            const opening = moves.slice(0, 4).join(' ');
            const result = normalizeResult(game.white.result);

            if (!whiteOpenings.has(opening)) {
                whiteOpenings.set(opening, { count: 0, wins: 0, draws: 0, losses: 0 });
            }

            const entry = whiteOpenings.get(opening);
            entry.count++;
            if (result === 'win') entry.wins++;
            else if (result === 'draw') entry.draws++;
            else entry.losses++;
        }

        // --- Black analysis ---
        if (game.black.username.toLowerCase() === usernameLower) {
            const opening = [moves[1], moves[3]].join(' '); // Black's first 2 moves
            const result = normalizeResult(game.black.result);

            if (!blackOpenings.has(opening)) {
                blackOpenings.set(opening, { count: 0, wins: 0, draws: 0, losses: 0 });
            }

            const entry = blackOpenings.get(opening);
            entry.count++;
            if (result === 'win') entry.wins++;
            else if (result === 'draw') entry.draws++;
            else entry.losses++;
        }
    }

    // --- Find most common openings ---
    const findMostCommon = (map) => {
        let maxCount = 0;
        let commonOpening = '';
        for (const [opening, data] of map.entries()) {
            if (data.count > maxCount) {
                maxCount = data.count;
                commonOpening = opening;
            }
        }
        return { opening: commonOpening, data: map.get(commonOpening) };
    };

    const mostWhite = whiteOpenings.size ? findMostCommon(whiteOpenings) : null;
    const mostBlack = blackOpenings.size ? findMostCommon(blackOpenings) : null;


    if (mostWhite) {
        const { count, wins } = mostWhite.data;
        const winrate = count ? (wins / count).toFixed(3)*100 : 'N/A';

        finalOpeningList.push(mostWhite.opening,count,winrate);

    } else {
       
        finalOpeningList.push("NA",0,0);
    }

    if (mostBlack) {
        const { count, wins } = mostBlack.data;
        const winrate = count ? (wins / count).toFixed(3)*100 : 'N/A';
     

        finalOpeningList.push(mostBlack.opening,count,winrate);
        
    } else {
    
        finalOpeningList.push("NA",0,0);
    }

    return finalOpeningList;
}
