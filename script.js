let numberOfBar = 15; 
let barHeight = 200;
let maxbar = 20;
let barsArray = [];


// ------------------ Changing values depending on screen size -------------------
var x = window.matchMedia("(max-width: 700px)");
mobileDisplay(x);

function mobileDisplay(x){
    if(x.matches){
        numberOfBar = 8;
        barHeight = 150;
        maxbar = 10;
    }
}

x.addEventListener("change", mobileDisplay(x));



init();

function init(){
    for(let i=0;i<numberOfBar;i++){
        barsArray[i] = Math.ceil(Math.random()*barHeight);
    }
    createbars();
}

function bubble(){
    const swaps = bubbleSort([...barsArray]);
    animate(swaps);
}

function selection(){
    const selectionSwaps = selectionSort([...barsArray]);
    animate(selectionSwaps);
}

function insertion(){
    const insertionSwaps = insertionSort([...barsArray]);
    animate(insertionSwaps);
}

function animate(swaps){
    if(swaps.length==0){
        createbars();
        return;
    }
    const [i,j]=swaps.shift(0);
    [barsArray[i],barsArray[j]]=[barsArray[j],barsArray[i]];
    createbars([i,j]);
    setTimeout(function(){
        animate(swaps);
    },500);
}



// ----------------------  Bubble sort -------------------------
function bubbleSort(barsArray) {
    const swaps = [];
    for(let i=0;i<barsArray.length-1;i++){
        for(let j=0;j<barsArray.length-i-1;j++){
            if(barsArray[j] > barsArray[j+1]){
                swaps.push([j, j+1]);
                [barsArray[j], barsArray[j+1]] = [barsArray[j+1], barsArray[j]];
            }
        }
    }
    return swaps;
}

// ----------------------- Selection sort ----------------------
function selectionSort(barsArray){
    const selectionSwaps = [];

    for(let i=0;i<barsArray.length-1;i++){
        let smallest = i;
        for(let j=i+1;j<barsArray.length;j++){
            if(barsArray[smallest] > barsArray[j])
                smallest = j;
        }
        selectionSwaps.push([smallest,i]);
        [barsArray[smallest], barsArray[i]] = [barsArray[i], barsArray[smallest]];
    }

    return selectionSwaps;
}

// ----------------------- Insertion sort --------------------
function insertionSort(barsArray){
    const insertionSwaps = [];
    for(let i=0;i<barsArray.length;i++){
        let currentElement = barsArray[i];
        let j = i-1; //previous element index
        
        while(j>=0 && currentElement < barsArray[j]){
            insertionSwaps.push([j,j+1]);
            barsArray[j+1] = barsArray[j];
            j--;
        }

        barsArray[j+1] = currentElement;
    }
    return insertionSwaps;
}


// -------------------------- Displaying bars on webpage -----------------------------
function createbars(indices){
    container.innerHTML="";


    for(let i=0;i<barsArray.length;i++){
        let bar = document.createElement("div");
        bar.className = "bars";
        bar.style.height = `${(barsArray[i]*2.5)/16}rem`;
        bar.innerText = `${barsArray[i]}`;
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red";
            bar.style.width = "2.5rem"
        }
        container.appendChild(bar);
    }
}

// --------------------------- Funtion to create new array ------------------------------
function changeArray(){
    numberOfBar = Math.floor(Math.random() * (maxbar - 5) + 5);
    barsArray = [];
    console.log(numberOfBar);
    init();
}