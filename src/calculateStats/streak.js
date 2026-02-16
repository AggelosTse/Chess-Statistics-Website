//CAN BE MORE OPTIMIZED

export function streaks(dataFile, name) {
  let results = [];

  let finalStreaksList = [];

  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();

    const whiteResult = dataFile[i]?.white?.result;
    const blackResult = dataFile[i]?.black?.result;

    let result;

    if (whiteName === searchName) {
      result = whiteResult;
    } else if (blackName === searchName) {
      result = blackResult;
    } else {
      continue;
    }

    if (result === "win") {
      results.push("win");
    } else if (
      result === "stalemate" ||
      result === "agreed" ||
      result === "repetition" ||
      result === "insufficient"
    ) {
      results.push("draw");
    } else if (
      result === "checkmated" ||
      result === "resigned" ||
      result === "timeout"
    ) {
      results.push("lose");
    }
  }

  let tempWins = findWinStreak(results);
  let tempDraws = findDrawStreak(results);
  let tempLoses = findLoseStreak(results);

  finalStreaksList.push(tempWins, tempDraws, tempLoses);

  return finalStreaksList;
}
function findWinStreak(results) {
  let winCounter = 0;
  let max = -1;

  for (let i = 0; i < results.length; i++) {
    if (results[i] === "win") {
      winCounter++;
      if (winCounter > max) {
        max = winCounter;
      }
    } else {
      winCounter = 0;
    }
  }

  return max;
}

function findDrawStreak(results) {
  let drawCounter = 0;
  let max = -1;

  for (let i = 0; i < results.length; i++) {
    if (results[i] === "draw") {
      drawCounter++;
      if (drawCounter > max) {
        max = drawCounter;
      }
    } else {
      drawCounter = 0;
    }
  }

  return max;
}

function findLoseStreak(results) {
  let loseCounter = 0;
  let max = -1;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "lose") {
      loseCounter++;
      if (loseCounter > max) {
        max = loseCounter;
      }
    } else {
      loseCounter = 0;
    }
  }

  return max;
}
