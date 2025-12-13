export function averageAccuracy(dataFile,name)
{

    if (!Array.isArray(dataFile)) return [0,0,0];    //checks if datafile is a array

    let generalSum = 0;
    let whiteSum = 0;
    let blackSum = 0;

    let generalPL = 0;
    let whitePL = 0;
    let blackPL = 0;
  
    const accuracyArray = [];

    for(let i=0; i<dataFile.length;i++)
    {
        const whiteAccuracy = dataFile[i].accuracies.white;
        const blackAccuracy = dataFile[i].accuracies.black;

        const whiteName = dataFile[i].white.username;
        const blackName = dataFile[i].black.username; 
        
        


        if(whiteName.toLowerCase() === name.toLowerCase())
        {

            if(!dataFile[i].accuracies || !whiteAccuracy) continue;
            
            generalSum += whiteAccuracy;
            generalPL++;

            whiteSum += whiteAccuracy;
            whitePL++;
        }
        else if(blackName.toLowerCase() === name.toLowerCase())
        {
            if(!dataFile[i].accuracies || !blackAccuracy) continue;

            generalSum += blackAccuracy;
            generalPL++;

            blackSum += blackAccuracy;
            blackPL++;
        }
    }
    if (generalPL === 0) {
        return [0,0,0];
    }

    accuracyArray.push(generalSum / generalPL);

    if (whitePL > 0)
    {
        accuracyArray.push(whiteSum / whitePL);
    }
    else 
    {
        accuracyArray.push(0);
    }

    if (blackPL > 0)
    {
        accuracyArray.push(blackSum / blackPL);
    }
    else
    {
        accuracyArray.push(0);
   
    }

    return accuracyArray;
}