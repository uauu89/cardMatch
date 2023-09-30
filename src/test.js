let cardArray, cardArrayCopy, openCard;
let selectedCard = [];

let whosTurn = "user";

let userDelay = false;
let turnContinuos = false;
let pairCase = false;

let com_turnCount = 0;


let timeDelay = 500;

let count_origin = 30,
    count_copy;


let score_com = 0,
    score_user = 0;

let func_timeCounter, func_countTimeOut, func_userDelayTimeOut, func_comDealyTimeOut;
let diceResult;

let difficulty = {
    // 랜덤 숫자가 아래 값보다 낮을 경우 작동, 0 >> 작동안함, 1 >> 항상작동
    "Opend" : 1,
    "NotOpen" : 0,
    // "random" : 0.9,
    "Select" : 0,
    "Pair" : 1,
    "trick" : 0
}


// 테스트용 임시 함수 --------------------------

newGame_vs()

insert_difficultyDefault();

document.querySelector("#difficulty2").click();

document.querySelector("#input_keepTurn").addEventListener("change", e=>{
    turnContinuos = e.currentTarget.checked ? true: false; 
})

// /테스트용 임시 함수 --------------------------


function newGame_single(){
    init("single");
    setCardArray();
    cardShuffleSimple(cardArrayCopy);
    insertCard(cardArrayCopy);
    cardCheck(true);
    turn_single();
}

function newGame_vs(){
    init("user");
    setCardArray();
    cardShuffleSimple(cardArrayCopy);
    insertCard(cardArrayCopy);
    cardCheck(false);
    
    printScore();
    
    playTurn();
    init_setDifficulty();
    // setTimeout(countStart, 100);
    
}

function init(who){
    countStop();
    clearTimeout(func_comDealyTimeOut);
    selectedCard = [];
    com_turnCount = 0;
    userDelay = false;
    whosTurn = who;
    
}


function dice(){
    return Math.floor(Math.random()*100);
}






function setCardArray(){
    cardArray = [];
    let i = 0;
    while(i < document.querySelector("#input_cardNum").value){
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
    document.querySelector(".gameBoard").innerHTML = dom_insertHTML;

}
function cardCheck(bool){
    clearTimeout(func_userDelayTimeOut);
    userDelay = false;
    if(bool){
        document.querySelectorAll(".card_wrap").forEach((card, idx)=>{
            setTimeout(() => {
                card.classList.add("card_open")
            }, idx*200);
    
            setTimeout(() => {
                card.classList.remove("card_open")
            }, idx*100+(cardArray.length*2*200)+3000);
        })
        func_userDelayTimeOut = setTimeout(()=>{
            userDelay = true;
        }, (cardArray.length*2*300+3000));
    }else{
        userDelay = true;
    }
}


function printScore(who){
    if(who === "single"){
        document.querySelector(".score_user span").innerText = "score_user";
    }else{
        document.querySelector(".score_user span").innerText = score_user;
        document.querySelector(".score_com span").innerText = score_com;
    }
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

    let result = selectedCard[0] === selectedCard[1];
    selectedCard = [];

    // if(selectedCard[0] === selectedCard[1]){
    if(result){
        if(who === "user"){
            winner += "user";
            score_user++;
        }else if(who === "com"){
            winner += "com";
            score_com++;
        }else{
            winner += "user";
            // 싱글 > 점수시스템 아직 안만듦
        }
        printScore(who);
        for(let i of document.querySelectorAll(".card_open")){
            i.setAttribute("class", winner);
        }

        for(let i of document.querySelectorAll(".correct")){
            openCard[i.dataset.index] = null
        };
        return true;
    }else{
        for(let i of document.querySelectorAll(".card_open")){
            i.classList.remove("card_open");
        }
        return false;
    }
    
}


function playTurn(){
    turn_user();
}

function turn_single(){
    document.querySelectorAll(".card_wrap").forEach((card, idx) => {

        card.addEventListener("click", e=>{
            if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                userDelay = false;

                pushOpenCard(idx);
                setTimeout(()=>{
                    userDelay = true;

                    if(selectedCard.length === 2){
                        checkMatching("single");
                    }
                }, timeDelay);
            }
        })
    });
}

// 원본 백업
// function turn_user(){
//     document.querySelectorAll(".card_wrap").forEach((card, idx) => {

//         card.addEventListener("click", e=>{
//             if(whosTurn === "user"){
//                 if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
//                     userDelay = false;
    
//                     pushOpenCard(idx);
//                     setTimeout(()=>{
//                         userDelay = true;
    
//                         if(selectedCard.length === 2){
//                             checkMatching("user");
//                             countStop();

//                             // if(turnContinuos){
//                             //     countStart();
//                             // }else{
//                             //     whosTurn = "com";
//                             //     for(let count = 0; count < 2; count++){
//                             //         setTimeout(turn_com, timeDelay * (count+1));
//                             //     }
//                             // }
//                             whosTurn = "com";
//                                 for(let count = 0; count < 2; count++){
//                                     setTimeout(turn_com, timeDelay * (count+1));
//                                 }

//                         }
//                     }, timeDelay);
//                 }
//             }
//         })
//     });
// }

function turn_user(){
    document.querySelectorAll(".card_wrap").forEach((card, idx) => {

        card.addEventListener("click", e=>{
            if(whosTurn === "user"){
                if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                    userDelay = false;
    
                    pushOpenCard(idx);

                    if(selectedCard.length === 2){
                        countStop();
                        let result = checkMatching("user");
                        if(turnContinuos && result){
                            setTimeout(()=>{
                                countStart();
                                userDelay = true;
                            }, timeDelay)
                        }else{
                            setTimeout(()=>{
                                countStart();
                                userDelay = true;
                            }, timeDelay)
                        }
                    }else{
                        setTimeout(()=>{
                            countStart();
                            userDelay = true;
                        }, timeDelay)
                    }
/*
                    setTimeout(()=>{
                        userDelay = true;
    
                        if(selectedCard.length === 2){
                            checkMatching("user");
                            countStop();

                            // if(turnContinuos){
                            //     countStart();
                            // }else{
                            //     whosTurn = "com";
                            //     for(let count = 0; count < 2; count++){
                            //         setTimeout(turn_com, timeDelay * (count+1));
                            //     }
                            // }
                            whosTurn = "com";
                                for(let count = 0; count < 2; count++){
                                    setTimeout(turn_com, timeDelay * (count+1));
                                }

                        }
                    }, timeDelay);
        */
                }
            }
        })
    });
}

function turn_com(){
        let com_idx;
        
        // if(com_turnCount === 0){
        //     diceResult = dice()
        // };
        diceResult = dice();

        com_turnCount++;
    
        if(selectedCard.length){                                // 해당 턴에 선택된 카드가 있는 경우
            if(com_checkOpen(selectedCard[0])){                 // 현재 턴에 선택된 카드와 과거 오픈되었던 카드 중에 맞는 짝이 있는 경우
                // console.log("1-1");
                if(diceResult < difficulty.select || pairCase){
                    com_idx = com_selectOpen(selectedCard[0]);
                    pairCase = false;
                }else{
                    com_idx = com_selectRandom();
                }
                // com_idx = diceResult < difficulty.select ? com_selectOpen(selectedCard[0]): com_selectRandom();
            }else{                                              // 현재 턴에 선택된 카드와 과거 오픈되었던 카드 중에 맞는 짝이 없는 경우
                // console.log("1-2")
                com_idx = com_selectRandom();
            }
        }else{                                                  // 현재 턴에 선택된 카드가 없는 경우
            if(com_selectPair()){                               // 과거 오픈된 카드 중에 짝이 맞는 카드쌍이 있는 경우
                // console.log("2-1")
                if(diceResult < difficulty.pair){
                    pairCase = true;
                    com_idx = com_selectPair();
                }else{
                    com_idx = com_selectRandom();
                }
            }else{                                              // 오픈된 카드 중에 짝이 맞는 카드가 없는 경우
                // console.log("2-2")
                com_idx = com_selectRandom();
            }
        }
    
        pushOpenCard(com_idx);
    
        if(com_turnCount === 2){
            com_turnCount = 0;
            func_comDealyTimeOut= setTimeout(()=>{
                checkMatching("com");
                whosTurn = "user";
                countStart();
            }, timeDelay);
        }
}

function com_checkOpen(num){    // num 카드의 짝 오픈여부 확인
    let targetArray = openCard.filter(i => i);
    return targetArray.indexOf(num) === targetArray.length? 
        false:
        targetArray.indexOf(num, targetArray.indexOf(num)+1)>-1 ? true : false;
}
function com_selectOpen(num){   // 현재 오픈된 카드의 짝을 선택
    let firstIndex = openCard.indexOf(num);
    let lastIndex = openCard.lastIndexOf(num);

    return document.querySelectorAll(".card_wrap")[firstIndex].classList.contains("card_open") ? lastIndex : firstIndex;
}
function com_selectRandom(){    // 오픈되지 않았던 카드 중에서 랜덤선택
    let diceResult = dice();
    let targetArray = [];

/*
    if(diceResult < difficulty.random.random){
        targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");

    }else if(diceResult < difficulty.random.notOpen){
        targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open):not(.opend)");
    }else{
        targetArray = document.querySelectorAll(".opend:not(.card_open)");
        if(targetArray.length === 0){       //오픈했던 카드가 존재하지 않는 경우 미오픈 카드를 선택 (바로 위 조건)
            targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open):not(.opend)");
        }
    }
*/

    if(diceResult < difficulty.Opend){
        targetArray = document.querySelectorAll(".opend:not(.card_open)");
        if(targetArray.length === 0){       //오픈했던 카드가 존재하지 않는 경우 미오픈 카드를 선택
            targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open):not(.opend)");
        }
    }else if(diceResult < difficulty.NotOpen){
        targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open):not(.opend)");
    }else{
        targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
    }



    if(targetArray.length === 0){
        targetArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
        // 미오픈 카드가 최종적으로 존재하지 않을 경우 카드 전체에서 랜덤선택
        // notOpen 조건에 not:(.opend) 가 있어서 선택되지 않는 경우
    }
    let selectedIdx = targetArray[Math.floor(Math.random()*targetArray.length)].dataset.index;
    return selectedIdx;
}
function com_selectPair(){  // 과거 오픈되었던 카드 배열중에서 짝을 선택
    let firstIndex, lastIndex;

    for(let i = 0; i < openCard.length; i++){
        /*
        if(openCard[i] == null){
            console.log("continue");
            continue;
        }else{
            firstIndex = openCard.indexOf(openCard[i]);
            lastIndex = openCard.lastIndexOf(openCard[i]);
        }
        */
        if(openCard[i] !== null){
            firstIndex = openCard.indexOf(openCard[i]);
            lastIndex = openCard.lastIndexOf(openCard[i]);
            // console.log(`firstIndex : ${firstIndex},  lastIndex : ${lastIndex}`);
        }

        if(firstIndex !== lastIndex){
            break;
        }
    }
    return firstIndex !== lastIndex ? firstIndex: false;
}


let btn_newSingle = document.querySelector("#btn_newSingle"),
    btn_newVs = document.querySelector("#btn_newVs");

btn_newSingle.addEventListener("click", ()=>newGame_single());

btn_newVs.addEventListener("click", ()=>newGame_vs());

// ---------------------------

document.querySelector(".optionOpen").addEventListener("click", (e)=>{
    e.preventDefault();
    document.querySelector(".header").classList.toggle("active");
})

// document.querySelector(".optionClose").addEventListener("click", (e)=>{
//     e.preventDefault();
//     document.querySelector(".header").classList.remove("active");
// })

document.querySelector(".btn_openBtnGroup").addEventListener("click", (e)=>{
    e.preventDefault();
    e.currentTarget.classList.toggle("active");
    document.querySelector(".group_btn").classList.toggle("active");
})


document.querySelector("#input_countTime").addEventListener("input", e=>{
    let num = e.currentTarget.value;
    if(num < 1 || num > 99){
        alert("1초 ~ 99초 내에서 선택해주세요");
        e.currentTarget.value = 30;
    }else{
        countSetting(num);
    }
})





// for(let i of document.querySelectorAll("*")){
//     i.addEventListener("focus", e=>{
//         console.log(e.currentTarget);
//     })
// }






window.addEventListener("resize", e=>{
    let screenSize = window.innerWidth;
    cardSize_responsive(screenSize);
})



function cardSize_responsive(num){

    if(document.querySelector("#input_autoSize").checked){
        if(num < 459){
            document.documentElement.style.setProperty("--cardSize_ratio", 0.6);
            document.querySelector("#cardSize3").checked = true;
        }else if(num < 592){
            document.documentElement.style.setProperty("--cardSize_ratio", 0.8);
            document.querySelector("#cardSize2").checked = true;
        }else{
            document.documentElement.style.setProperty("--cardSize_ratio", 1);
            document.querySelector("#cardSize1").checked = true;
        }
    }
}


for(let i of document.querySelectorAll("input[name=cardSize]")){
    i.addEventListener("input", e=>{
        let num = e.currentTarget.id;
        switch(num){
            case "cardSize1":
                document.documentElement.style.setProperty("--cardSize_ratio", 1);
                break;
            case "cardSize2":
                document.documentElement.style.setProperty("--cardSize_ratio", 0.8);
                break;
            case "cardSize3":
                document.documentElement.style.setProperty("--cardSize_ratio", 0.6);
                break;
            default:
                break;
        }
    })
}



function countSetting(num){
    count_origin = num;
    document.documentElement.style.setProperty("--turn_count", count_origin+"s");

}
function countStart(){

    for(let i of document.querySelectorAll(".clockHands")){
        i.classList.add("animation");
    }

    func_countTimeOut = setTimeout(()=>countStop(), count_origin*1000+500);

    count_copy = count_origin;

    document.querySelector(".timer_wrap .clockNum").innerText = count_copy;
    
    func_timeCounter = setInterval(()=>{
        document.querySelector(".timer_wrap .clockNum").innerText = --count_copy;
        if(count_copy === 0){
            clearInterval(func_timeCounter);

            userDelay = true;
            for(let i of document.querySelectorAll(".card_open")){
                i.classList.remove("card_open");
            };
            whosTurn = "com";
            selectedCard = [];
            for(let count = 0; count < 2; count++){
                setTimeout(turn_com, timeDelay * (count+1));
            }

        }
    }, 1000);
}

function countStop(){
    clearTimeout(func_countTimeOut);
    for(let i of document.querySelectorAll(".clockHands")){
        i.classList.remove("animation");
    }
    document.querySelector(".timer_wrap .clockNum").innerText = "";

    clearInterval(func_timeCounter);
}



function inputCountNoTime(){

    let inputCheck = document.querySelector("#input_countNoTime"),
        inputNumber = document.querySelector("#input_countTime");
    
        inputCheck.addEventListener("input", e=>{
            if(inputCheck.checked){
                inputNumber.parentNode.classList.add("disabled");
                inputNumber.disabled = true;
            }else{
                inputNumber.parentNode.classList.remove("disabled");
                inputNumber.disabled = false;
            }
    })
}
inputCountNoTime();






document.querySelector(".modal_depthDetail a").addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(".arcodion_wrap").classList.toggle("active");
})




//  옵션창 난이도 관련 함수들 ---------------------

/*

input type=range 값을 input type=number 로 옮기는 함수
input type=number 값을 input type=range로 옮기는 함수

input type=range 값으로 css 적용하는 함수


실제 난이도로 적용하는 함수


*/



function style_difficultyBg(targetDom, value){
    targetDom.style.background = `linear-gradient(to right, var(--color_main) ${value}%, #fff ${value}%)`;
}
function update_difficulty_otherType(targetType, targetDataCategory, value){
    document.querySelector(`input[type=${targetType}][data-category$=${targetDataCategory}]`).value = value;
}

function input_difficultyDetail(){
    let inputRange = document.querySelectorAll(".group_range input[type=range]");
    let inputNumber = document.querySelectorAll(".group_range input[type=number]");

    inputRange.forEach(i=>{
        i.addEventListener("input", e=>{
            style_difficultyBg(e.currentTarget, e.currentTarget.value);
            update_difficulty_otherType("number", e.currentTarget.dataset.category, e.currentTarget.value);
        })
    })

    inputNumber.forEach(i=>{
        i.addEventListener("change", e=>{
            let rangeDom = e.currentTarget.closest(".inputWrap").previousElementSibling;
            // || !Number.isInteger(e.currentTarget.value)
            if(e.currentTarget.value < 0 || e.currentTarget.value > 100 || Number.isInteger(e.currentTarget.value)){
                alert("0 ~ 100 사이의 정수를 입력해주세요");
                e.currentTarget.value = rangeDom.value;
            }else{
                e.currentTarget.value = parseInt(e.currentTarget.value);
                style_difficultyBg(rangeDom, e.currentTarget.value);
                update_difficulty_otherType("range", e.currentTarget.dataset.category, e.currentTarget.value);
            }
        })
    })
}

function apply_difficultyDetail(){

}




input_difficultyDetail();

function init_setDifficulty(){
    difficulty ={
        "Opend" : document.querySelector("#detail_randomOpend").value,
        "NotOpen" : document.querySelector("#detail_randomNotOpen").value,
        // "random" : 0.9,
        "Select" : document.querySelector("#detail_designatedSelect").value,
        "Pair" : document.querySelector("#detail_designatedPair").value,
        "trick" : 0
    }
}

function insert_difficultyDefault(){
    document.querySelectorAll("input[name=difficulty]").forEach(i=>{
        i.addEventListener("change", e=>{
            let selectValue = e.currentTarget.id;
            let var_difficulty;
            switch(selectValue){
                case "difficulty1":
                    var_difficulty = {
                        "Opend" : 0,
                        "NotOpen" : 0,
                        // "random" : 1,
                        "Select" : 0,
                        "Pair" : 0,
                        "trick" : 0
                    }
                    break;
                case "difficulty2":
                    
                    var_difficulty = {
                        "Opend" : 0,
                        "NotOpen" : 100,
                        // "random" : 0.5,
                        "Select" : 40,
                        "Pair" : 30,
                        "trick" : 0
                    }
                    break;
                case "difficulty3":
                    var_difficulty = {
                        "Opend" : 0,
                        "NotOpen" : 100,
                        // "random" : 0,
                        "Select" : 80,
                        "Pair" : 70,
                        "trick" : 0
                    }
                    break;
                case "difficulty4":
                    var_difficulty = {
                        "Opend" : 50,
                        "NotOpen" : 100,
                        // "random" : 0,
                        "Select" : 100,
                        "Pair" : 100,
                        "trick" : 0
                    }
                    break;
                default:
            }
            let loopArray = ["Opend", "NotOpen", "Select", "Pair"];
            loopArray.forEach(i=>{
                let targetRange = document.querySelector(`input[type=range][data-category$=${i}]`);
                style_difficultyBg(targetRange, var_difficulty[i]);
                update_difficulty_otherType("range", i, var_difficulty[i]);
                update_difficulty_otherType("number", i, var_difficulty[i]);
            })

        })
    })


}