export function winPercentage(dataFile, name) {
  let wonByCheckmate = 0;
  let wonByResignation = 0;
  let wonByTimeOut = 0;

  let totalwins = 0;

  const finalWinList = [];

  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    const whiteResult = dataFile[i]?.white?.result?.toLowerCase();
    const blackResult = dataFile[i]?.black?.result?.toLowerCase();

    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();



    if (!whiteResult || !blackResult) continue;

    let result;

    if (whiteName === searchName) {
      result = blackResult;
    } else if (blackName === searchName) {
      result = whiteResult;
    } else {
      continue;
    }

    if (result === "checkmated") {
      wonByCheckmate++;
      totalwins++;
    } else if (result === "resigned" || result === "abandoned") {
      wonByResignation++;
      totalwins++;
    } else if (result === "timeout") {
      wonByTimeOut++;
      totalwins++;
    }
  }

  if (totalwins === 0) {
    return [0, 0, 0, 0, 0, 0];
  }

  finalWinList.push(
    wonByCheckmate,
    Math.round((wonByCheckmate / totalwins) * 100)
  );

  finalWinList.push(
    wonByResignation,
    Math.round((wonByResignation / totalwins) * 100)
  );

  finalWinList.push(wonByTimeOut, Math.round((wonByTimeOut / totalwins) * 100));

  return finalWinList;
}
