export function allElos(dataFile, name) {
  let elolist = [];

  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    // ? checks if its undefined, if it is, goes to next iteration
    const whiteUsername = dataFile[i]?.white?.username?.toLowerCase();
    const blackUsername = dataFile[i]?.black?.username?.toLowerCase();

    const whiteRating = dataFile[i].white?.rating;
    const blackRating = dataFile[i].black?.rating;

    if (whiteUsername === searchName) {
      if (!whiteRating) continue;

      elolist.push(whiteRating);
    } else if (blackUsername === searchName) {
      if (!blackRating) continue;

      elolist.push(blackRating);
    }
  }
  return elolist;
}
