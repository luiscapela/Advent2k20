const fs = require("fs");

const contents = fs.readFileSync("day3input.txt", "utf8");
const lines = contents.split(/\r?\n/); 
const firstLine = lines[0]; 
const patternLength = firstLine.length  
let numberOfTrees = 0


 
lines.forEach((line, index)=>{
    if (index === 0 ) {
        return 
    } 
    const position = (index*3) % patternLength;  
     
    const place = line[position] 
     
    if (place === "#") {
       numberOfTrees = numberOfTrees + 1   
       
    }





})  
console.log("Number: ",numberOfTrees)