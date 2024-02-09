"use-strict"

window.addEventListener("DOMContentLoaded", start);

let globalArrayOfWords = [];

async function start(){
    await loadData();
    performance.mark('start');
    console.log(binarySearchComparator("hestevogns", strcmp));
    performance.mark('end');
    console.log(performance.measure('binarySearch', 'start', 'end'));
    performance.mark('start2');
    console.log(globalArrayOfWords.findIndex(wordObject => wordObject.variant === "hestevogns"));
    performance.mark('end2');
    console.log(performance.measure('findIndex', 'start2', 'end2'));
}

async function loadData(){
    const response = await fetch("../datafolder/ddo_fullforms_2023-10-11.csv");
    const rawtext = await response.text();

    globalArrayOfWords = rawtext.split("\n").map(line => {
        const parts = line.split("\t");
        return {
          variant: parts[0],
          headword: parts[1],
          homograph: parts[2],
          partofspeech: parts[3],
          id: parts[4]
        }
    });
}

function binarySearchComparator(value, comparator){
    let start = 0;
    let end = globalArrayOfWords.length-1;
    
    while(start <= end){
        const middle = Math.floor((start+end)/2);
        const compare = globalArrayOfWords[middle].variant;
        if(comparator(value, compare) === 0){
            return middle;
        } else if(comparator(value, compare) === -1){
            end = middle-1;
        } else {
            start = middle+1;
        }
    }
    return -1;
}

function strcmp(search,check) {
    return search.localeCompare(check, 'da');
}