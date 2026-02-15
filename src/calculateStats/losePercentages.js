export function losePercentage(dataFile, name) {
  let lostByCheckmate = 0;
  let lostByResignation = 0;
  let lostByTimeOut = 0;

  let losetotal = 0;

  const finalLoseList = [];

  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    const whiteResult = dataFile[i]?.white?.result?.toLowerCase();
    const blackResult = dataFile[i]?.black?.result?.toLowerCase();

    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();

    if (!whiteResult || !blackResult) continue;

    let result;

    if (whiteName === searchName) {
      result = whiteResult;
    } else if (blackName === searchName) {
      result = blackResult;
    } else {
      continue;
    }

    if (result === "checkmated") {
      lostByCheckmate++;
      losetotal++;
    } else if (result === "resigned" || result === "abandoned") {
      lostByResignation++;
      losetotal++;
    } else if (result === "timeout") {
      lostByTimeOut++;
      losetotal++;
    }
  }


if (losetotal === 0) {
  return [0, 0, 0, 0, 0, 0];
}

finalLoseList.push(
  lostByCheckmate,
  Math.round((lostByCheckmate / losetotal) * 100)
);

finalLoseList.push(
  lostByResignation,
  Math.round((lostByResignation / losetotal) * 100)
);

finalLoseList.push(
  lostByTimeOut,
  Math.round((lostByTimeOut / losetotal) * 100)
);

return finalLoseList;
}