export function allElos(dataFile,name)
{
    let elolist = [];

    for(let i=0;i<dataFile.length;i++)
    {
        if(dataFile[i].white.username.toLowerCase() === name.toLowerCase())
        {
            elolist.push(dataFile[i].white.rating);
        }
       else if(dataFile[i].black.username.toLowerCase() === name.toLowerCase())
        {
            elolist.push(dataFile[i].black.rating);
        }

   
         } 
    return elolist;
}