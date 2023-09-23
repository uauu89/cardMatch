let cardArray, cardArrayCopy, openCard;
let selectedCard = [];

let whosTurn = "user";

let userDelay = false;

let com_turnCount = 0;


let timeDelay = 500;


let score_com = 0,
    score_user = 0;


// 테스트용 임시 함수 --------------------------

init();     // 임시 바로시작 

// /테스트용 임시 함수 --------------------------


function init(){  
    setCardArray();
    cardShuffleSimple(cardArrayCopy);
    insertCard(cardArrayCopy);
    cardCheck(false);

    printScore();
    // turn_user();
    
    playTurn();

}
function setCardArray(){
    cardArray = [];
    let i = 0;
    while(i < document.querySelector("#inputNum").value){
        cardArray.push(i+1)
        i++;
    }
    cardArrayCopy = [...cardArray, ...cardArray];
    openCard = new Array(cardArray.length*2).fill(null);
}
function cardShuffleSimple(array){
    array.sort(()=>Math.random() - 0.5);
}
function insertCard(array){
    let dom_insertHTML = "";
    array.forEach((i, idx)=>{
        dom_insertHTML += `
        <div class="card_wrap" data-value=${i} data-index=${idx}>
            <div class="card card_front">
                <div class="deco border top left"></div>
                <div class="deco top left"></div>
                <div class="deco border top right"></div>
                <div class="deco top right"></div>
                <div class="deco border bottom left"></div>
                <div class="deco bottom left"></div>
                <div class="deco border bottom right"></div>
                <div class="deco bottom right"></div>
                ${i}
            </div>
            <div class="card card_back">
                <div class="deco border top left"></div>
                <div class="deco top left"></div>
                <div class="deco border top right"></div>
                <div class="deco top right"></div>
                <div class="deco border bottom left"></div>
                <div class="deco bottom left"></div>
                <div class="deco border bottom right"></div>
                <div class="deco bottom right"></div>
            </div>
        </div>`;
    });
    document.querySelector(".wrap").innerHTML = dom_insertHTML;
}
function cardCheck(bool){
    if(bool){
        document.querySelectorAll(".card_wrap").forEach((card, idx)=>{
            setTimeout(() => {
                card.classList.add("card_open")
            }, idx*200);

            setTimeout(() => {
                card.classList.remove("card_open")
            }, idx*100+(cardArray.length*2*200)+3000);
        })
        setTimeout(()=>{
            userDelay = true;
        }, (cardArray.length*2*300+3000));
    }else{
        userDelay = true;
    }
}

function printScore(){
    document.querySelector("#userScore span").innerText = score_user;
    document.querySelector("#comScore span").innerText = score_com;
}
function pushOpenCard(idx){

    let targetCard = document.querySelectorAll(".card_wrap")[idx];

    openCard[idx] = targetCard.dataset.value;
    selectedCard.push(targetCard.dataset.value);

    targetCard.classList.add("card_open");
    targetCard.classList.add("opend");
}
function checkMatching(who){
    let winner = "card_wrap correct ";
    if(selectedCard[0] === selectedCard[1]){
        if(who === "user"){
            winner += "user";
            score_user++;
        }else{
            winner += "com";
            score_com++;
        }
        printScore();
        for(let i of document.querySelectorAll(".card_open")){
            i.setAttribute("class", winner);
        }

        for(let i of document.querySelectorAll(".correct")){
            openCard[i.dataset.index] = null
        };
        
    }else{
        for(let i of document.querySelectorAll(".card_open")){
            i.classList.remove("card_open");
        }
    }
    selectedCard = [];
}


function playTurn(){
    turn_user();
}

function turn_user(){
    document.querySelectorAll(".card_wrap").forEach((card, idx) => {

        card.addEventListener("click", e=>{
            if(whosTurn === "user"){
                if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                    userDelay = false;
    
                    pushOpenCard(idx);
                    setTimeout(()=>{
                        userDelay = true;
    
                        if(selectedCard.length === 2){
                            checkMatching("user");
                            whosTurn = "com";
                            for(let count = 0; count < 2; count++){
                                setTimeout(turn_com, timeDelay * (count+1));
                            }
                        }
                    }, timeDelay);
                }
            }
        })
    });
}
function turn_com(){
        let com_idx;
        com_turnCount++;
    
        if(selectedCard.length){    // 해당 턴에 선택된 카드가 있는 경우
            
            if(com_checkOpen(selectedCard[0])){    // 해당 턴에 선택된 카드와 오픈되었던 카드 중에 맞는 짝이 있는 경우
                console.log("1-1")
                com_idx = com_selectOpen(selectedCard[0]);
                // > 해당 카드를 선택
    
            }else{                                  // 해당 턴에 선택된 카드와 오픈되었던 카드 중에 맞는 짝이 없는 경우
                console.log("1-2")
                com_idx = com_selectRandom();
                // 난이도 하 > 모든 카드 중에 랜덤 오픈
                // 난이도 상 > 오픈 된 적이 없는 카드 중에 랜덤 오픈
            }
        }else{                      // 해당 턴에 선택된 카드가 없는 경우
    
            if(com_selectFair()){      // 오픈된 카드 중에 짝이 맞는 카드가 있는 경우
                console.log("2-1")
                com_idx = com_selectFair();
                // 짝이 맞는 카드 오픈 >> 두번 째 선택에서 조건문 첫번째에 해당되어 추가 조치 필요 없을 듯
    
            }else{              // 오픈된 카드 중에 짝이 맞는 카드가 없는 경우
    
                // 카드 랜덤 오픈
                console.log("2-2")
                com_idx = com_selectRandom();
    
            }
        }
    
        pushOpenCard(com_idx);
    
        if(com_turnCount === 2){
            com_turnCount = 0;
            setTimeout(()=>{
                checkMatching("com");
                whosTurn = "user";
            }, timeDelay);
        }
}

function com_checkOpen(num){
    let targetArray = openCard.filter(i => i);
    return targetArray.indexOf(num) === targetArray.length? 
        false:
        targetArray.indexOf(num, targetArray.indexOf(num)+1)>-1 ? true : false;
}
function com_selectOpen(num){
    let firstIndex = openCard.indexOf(num);
    let lastIndex = openCard.lastIndexOf(num);

    return document.querySelectorAll(".card_wrap")[firstIndex].classList.contains("card_open") ? lastIndex : firstIndex;
}
function com_selectRandom(){    // 오픈되지 않았던 카드 중에서 랜덤선택
    let noOpenArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
    let selectedIdx = noOpenArray[Math.floor(Math.random()*noOpenArray.length)].dataset.index;
    return selectedIdx;
}
function com_selectFair(){  // 오픈된 카드쌍을 선택
    let firstIndex, lastIndex;

    for(let i = 0; i < openCard.length; i++){
        if(openCard[i] == null){
            continue;
        }else{
            firstIndex = openCard.indexOf(openCard[i]);
            lastIndex = openCard.lastIndexOf(openCard[i]);
        }
        if(firstIndex !== lastIndex){
            break;
        }
    }
    return firstIndex !== lastIndex ? firstIndex: false;
}


document.querySelector("#newGame").addEventListener("click", e=>{
    init();
})

document.querySelector("#aiTest").addEventListener("click", e=>{
    turn_com();
})





