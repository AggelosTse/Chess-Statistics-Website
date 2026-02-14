export function averageAccuracy(dataFile, name) {
  let generalSum = 0;
  let whiteSum = 0;
  let blackSum = 0;

  let generalPL = 0;
  let whitePL = 0;
  let blackPL = 0;

  const accuracyArray = [];

  const searchName = name.toLowerCase();

  for (let i = 0; i < dataFile.length; i++) {
    const whiteAccuracy = dataFile[i]?.accuracies?.white;
    const blackAccuracy = dataFile[i]?.accuracies?.black;

    const whiteName = dataFile[i]?.white?.username?.toLowerCase();
    const blackName = dataFile[i]?.black?.username?.toLowerCase();

    if (whiteName === searchName) {
      if (whiteAccuracy == null) continue;

      generalSum += whiteAccuracy;
      generalPL++;

      whiteSum += whiteAccuracy;
      whitePL++;

      continue;
    } else if (blackName === searchName) {
      if (blackAccuracy == null) continue;

      generalSum += blackAccuracy;
      generalPL++;

      blackSum += blackAccuracy;
      blackPL++;
    }
  }
  if (generalPL === 0) {
    return [0, 0, 0];
  }

  accuracyArray.push(Math.floor(generalSum / generalPL));

  if (whitePL > 0) {
    accuracyArray.push(Math.floor(whiteSum / whitePL));
  } else {
    accuracyArray.push(0);
  }

  if (blackPL > 0) {
    accuracyArray.push(Math.floor(blackSum / blackPL));
  } else {
    accuracyArray.push(0);
  }

  return accuracyArray;
}
