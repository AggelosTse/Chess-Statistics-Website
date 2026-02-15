export function highestOpponentElo(dataFile, name) {
  let listOfHighestElo = [];
  let listOfHighestEloWon = [];

  const highestopplist = [];

  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    const whiteResult = dataFile[i]?.white?.result;
    const blackResult = dataFile[i]?.black?.result;

    const whiteRating = dataFile[i]?.white?.rating;
    const blackRating = dataFile[i]?.black?.rating;

    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();

    if (whiteName === searchName) {
      if (!whiteResult || !blackRating) continue;
      if (whiteResult === "win") {
        listOfHighestEloWon.push(blackRating);
      }
      listOfHighestElo.push(blackRating);
    } else if (blackName === searchName) {
      if (!blackResult || !whiteRating) continue;
      if (blackResult === "win") {
        listOfHighestEloWon.push(whiteRating);
      }
      listOfHighestElo.push(whiteRating);
    }
  }

  const maxFaced = listOfHighestElo.reduce((a, b) => Math.max(a, b), 0);
  const maxWon = listOfHighestEloWon.reduce((a, b) => Math.max(a, b), 0);

  return [maxFaced, maxWon];
}
