export function averageMoves(dataFile, name) {
  let listOfTotalMoves = [];
  const searchName = name.toLowerCase();
  const moveRegex =
    /[KQRNB]?[a-h]?[1-8]?x?[a-h][1-8](?:=?[QRNB])?[+#]?|O-O(?:-O)?/g;
  for (let i = 0; i < dataFile.length; i++) {
    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();

    if (!dataFile[i].pgn) continue;

    const movesOnly = dataFile[i]?.pgn

      .replace(/\[.*?\]/gs, "") // Remove headers
      .replace(/\{.*?\}|\(.*?\)|\$\d+/g, "") // Remove comments and variations
      .replace(/\d+\.(\.\.)?/g, "") // Remove move numbers
      .replace(/\s*(1-0|0-1|1\/2-1\/2)\s*/g, "")
      .trim();

    const moves = movesOnly.match(moveRegex);

    if (!moves) continue;

    if (whiteName === searchName) {
      listOfTotalMoves.push(Math.ceil(moves.length / 2));
    } else if (blackName === searchName) {
      listOfTotalMoves.push(Math.floor(moves.length / 2));
    }
  }

  if (listOfTotalMoves.length === 0) return "0";

  listOfTotalMoves.sort((a, b) => a - b);

  const mid = Math.floor(listOfTotalMoves.length / 2);
  let median;

  if (listOfTotalMoves.length % 2 === 0) {
    median = (listOfTotalMoves[mid - 1] + listOfTotalMoves[mid]) / 2;
  } else {
    median = listOfTotalMoves[mid];
  }

  return median.toFixed(0);
}
