export function maxelo(dataFile, name) {
  const searchName = name.toLowerCase();

  let max = -1;

  for (let i = 0; i < dataFile.length; i++) {
    let result;

    const whiteUsername = dataFile[i]?.white?.username?.toLowerCase();
    const blackUsername = dataFile[i]?.black?.username?.toLowerCase();

    const whiteRating = dataFile[i]?.white?.rating;
    const blackRating = dataFile[i]?.black?.rating;

    if (!whiteRating || !blackRating) continue;

    if (whiteUsername === searchName) {
      result = whiteRating;
    } else if (blackUsername === searchName) {
      result = blackRating;
    } else {
      continue;
    }
    if (result > max) {
      max = result;
    }
  }
  return max;
}
