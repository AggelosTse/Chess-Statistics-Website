export function averageOpponentElo(dataFile, name) {
  let opponentElos = [];
  let average;
  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();

    if (whiteName === searchName) {
      const blackRating = dataFile[i]?.black?.rating;
      if (!blackRating) continue;
      opponentElos.push(blackRating);
    } else if (blackName === searchName) {
      const whiteRating = dataFile[i]?.white?.rating;
      if (!whiteRating) continue;
      opponentElos.push(whiteRating);
    }
  }
  if (opponentElos.length === 0) {
    return 0;
  }

  opponentElos.sort((a, b) => a - b);

  const length = opponentElos.length;

  const mid = Math.floor(length / 2);

  if (length % 2 === 0) {
    average = (opponentElos[mid - 1] + opponentElos[mid]) / 2;
  } else {
    average = opponentElos[mid];
  }
  return average;
}
