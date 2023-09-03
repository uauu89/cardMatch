let cardArray = [1, 2, 3, 4, 5, 6, 7, 8];

function cardShuffle(array){
    let cardArrayCopy = [...array, ...array];
    let cardArrayCount = cardArrayCopy.length;
    let cardArrayShuffle = [];

    for(let i = 0; i < array.length*2; i++){
        cardArrayShuffle.push(cardArrayCopy.splice([Math.floor(Math.random() * cardArrayCount)], 1)[0]);
        --cardArrayCount;
    }
    return cardArrayShuffle;
}


function cardShuffleSimple(array){
    array.sort(()=>Math.random() - 0.5);
}

let cardArrayCopy = [...cardArray, ...cardArray];

cardShuffleSimple(cardArrayCopy);


// -------loop test


let loopArray = [...cardArray];
function loopShuffle(times){
    let looptimes = 0;
    while(looptimes < times){
        // console.log("cardArrayCopy : ", loopArray);
        // console.log("shuffle : ", cardShuffle(loopArray));
        console.log(cardShuffle(loopArray));
        looptimes++;
    }
}
function loopShuffleSimple(times){
    let looptimes = 0;
    while(looptimes < times){
        let copyLoopArray = [...loopArray, ...loopArray,];
        copyLoopArray.sort(()=>Math.random() - 0.5);
        console.log(copyLoopArray);
        looptimes++;
    }
}

// -------loop test

// offsetwidth

let dom_insertHTML = "";

for(let i of cardArrayCopy){
    dom_insertHTML += `<div class="card_wrap" data-value=${i}><div class="card card_front">${i}</div><div class="card card_back"></div></div>`;
}
document.querySelector(".wrap").innerHTML = dom_insertHTML;




let cardWrap = document.querySelectorAll(".card_wrap"),
    notice = document.querySelector(".notice span")
    

let checkCardNum = 2,
    selectedNum = [],
    score = 0;

notice.innerText = score;


function singleStart(){
    for(let _time = 0; _time < cardWrap.length; _time++){
        console.log(_time);
        setTimeout(()=>{
            cardWrap[_time].classList.add("card_click");
        }, 200 * (_time + 1) );
        setTimeout(()=>{
            cardWrap[_time].classList.remove("card_click");
        }, cardWrap.length * 200 + 2000 + 50 * _time)
    }
    checkCardNum = 0;
}

singleStart();

for(let i of cardWrap){
    i.addEventListener("click", (e)=>{

        if(!e.currentTarget.classList.contains("card_click") && !e.currentTarget.classList.contains("correct") && checkCardNum < 2){
            i.classList.add("card_click");
            checkCardNum++;
            // console.log(e.currentTarget.dataset.value)
            selectedNum.push(e.currentTarget.dataset.value);
            console.log(selectedNum);
            if(checkCardNum == 2){
                setTimeout(()=>{
                    if(selectedNum[0] == selectedNum[1]){
                        for(let j of document.querySelectorAll(".card_click")){
                            j.setAttribute("class", "card_wrap correct");
                        }
                        score += 100
                    }else{
                        for(let j of cardWrap){
                            j.classList.remove("card_click");
                        }
                        score -= 10
                    }
                    checkCardNum = 0;
                    selectedNum = [];
                    notice.innerText = score;
                }, 800)
            }
        }
    })
}