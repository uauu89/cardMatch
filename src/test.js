let cardArray, cardArrayCopy, openCard;
let selectedCard = [];

let gameMode = "single";
let whosTurn = "user";

let userDelay = false;
let turnContinuos = false;
let pairCase = false;
let switch_playing = true;
let case_noCount = false;
let case_showAnimation = true;

let com_turnCount = 0;


let timeDelay = 500;

let count_origin = 30,
    count_copy;


let score_com = 0,
    score_user = 0,
    score_combo = 0;

let func_timeCounter = null,
    func_countTimeOut, func_userDelayTimeOut, func_comDelayTimeOut;
let diceResult;

let difficulty = {
    // 랜덤 숫자가 아래 값보다 낮을 경우 작동, 0 >> 작동안함, 1 >> 항상작동
    "Remains": 0,
    "Opend" : 0,
    "NotOpen" : 0,
    "Select" : 0,
    "Pair" : 0,
}



disLink();
btnFunction();

option_cardNum();
option_countTime();
option_cardSize();
option_noCount();
option_difficultyDetail();
difficulty_selectBtn();



window.addEventListener("resize", e=>{
    option_cardResponsive(window.innerWidth);
})


document.querySelector("#difficulty2").click();
window.dispatchEvent(new Event("resize"));


function dice(){
    return Math.floor(Math.random()*100);
}
function printScore(){
    if(whosTurn === "single"){
        document.querySelector(".score_user span").innerText = score_user;
        document.querySelector(".score_com span").innerText = score_combo;
    }else{
        document.querySelector(".score_user span").innerText = score_user;
        document.querySelector(".score_com span").innerText = score_com;
    }
}
function disLink(){
    document.querySelectorAll("a").forEach(i=>{
        i.addEventListener("click", e=>{
            e.preventDefault();
        })
    })
}
function btnFunction(){
    document.querySelectorAll(".btn_newGame.single").forEach(i=>{
        i.addEventListener("click", ()=>{newGame_single()});
    })
    document.querySelectorAll(".btn_newGame.vs").forEach(i=>{
        i.addEventListener("click", ()=>{newGame_vs()});
    })

    document.querySelector(".optionOpen").addEventListener("click", ()=>{
        document.querySelector(".header").classList.toggle("active");
    })
    document.querySelector(".btn_openBtnGroup").addEventListener("click", e=>{
        e.currentTarget.classList.toggle("active");
        document.querySelector(".group_btn").classList.toggle("active");
    })

    document.querySelector(".btn_difficultyDetail").addEventListener("click", e=>{
        e.currentTarget.classList.toggle("active");
    })

    document.querySelectorAll(".btn_newGame").forEach(i=>{
        i.addEventListener("click", ()=>{
            document.querySelector(".header").classList.remove("active");
        })
    })
}

function newGame_single(){
    gameMode = "single";
    // whosTurn = "single";
    
    init("single");
    printScore();
    turn_single();
}
function newGame_vs(){
    gameMode = "vs";
    // whosTurn = "user";
    init("user");
    printScore();
    turn_user();
    
    
}
function init(who){
    document.querySelector(".header").classList.remove("active");
    count_stop();
    clearTimeout(func_comDelayTimeOut);

    selectedCard = [];
    com_turnCount = 0;
    score_com = score_user = 0;
    score_combo = 0;
    userDelay = false;
    switch_playing = true;
    
    whosTurn = who;
    set_difficulty();
    set_countTime();
    set_keepTurn();
    
    set_scoreBoard();
    set_cardArray();
    document.querySelector(".gameOver_wrap").classList.remove("active");
    set_cardSetting(cardArrayCopy);
    set_animation();
    
}

function set_scoreBoard(){
    if(whosTurn === "single"){
        document.querySelector(".score_user").innerHTML = `점수 : <span></span>`;
        document.querySelector(".score_com").innerHTML = `콤보 : <span></span>`;
        // document.querySelector(".score_com").classList.add("hidden");
    }else{
        document.querySelector(".score_user").innerHTML = `유저 : <span></span>`;
        document.querySelector(".score_com").innerHTML = `컴퓨터 : <span></span>`;
        // document.querySelector(".score_com").classList.remove("hidden");
    }
}
function set_cardArray(){
    cardArray = [];
    let i = 0;
    while(i < document.querySelector("#input_cardNum").value){
        cardArray.push(i+1)
        i++;
    }
    cardArrayCopy = [...cardArray, ...cardArray];
    openCard = new Array(cardArray.length*2).fill(null);
}
function set_cardShuffle(array){
    array.sort(()=>Math.random() - 0.5);
}
function set_cardSetting(array){
    set_cardShuffle(array);
    let dom_insertHTML = "";
    array.forEach((i, idx)=>{
        dom_insertHTML += `
        <div class="card_wrap init" data-value=${i} data-index=${idx}>
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

    document.querySelectorAll(".card_wrap").forEach((i, idx)=>{
        setTimeout(()=>{i.classList.remove("init")}, idx*50)
        setTimeout(()=>{i.classList.add("initAnimation")}, (idx+1)*50)
        setTimeout(()=>{i.classList.remove("initAnimation")}, (idx+1)*50+300)
    })

    setTimeout(cardCheck, document.querySelectorAll(".card_wrap").length*50+350);
}
function set_userDelay(time){
    clearTimeout(func_userDelayTimeOut);
    userDelay = false;
    func_userDelayTimeOut = setTimeout(()=>{
        userDelay = true;
        count_start();
    }, time);
}
function set_countTime(){
    case_noCount = document.querySelector("#input_noCount").checked? true: false;

    if(!case_noCount){
        count_origin = document.querySelector("#input_countTime").value;
        document.documentElement.style.setProperty("--turn_count", count_origin+"s");
    }
}
function set_animation(){
    case_showAnimation = document.querySelector("#input_noAnimation").checked? true: false;
}
function set_difficulty(){
    difficulty ={
        "Remains" : document.querySelector("#detail_ratioRemains").value,
        "Opend" : document.querySelector("#detail_randomOpend").value,
        "NotOpen" : document.querySelector("#detail_randomNotOpen").value,
        "Select" : document.querySelector("#detail_designatedSelect").value,
        "Pair" : document.querySelector("#detail_designatedPair").value,
    }
}
function set_keepTurn(){
    turnContinuos = document.querySelector("#input_keepTurn").checked? true: false;
}

function cardCheck(){
    let cardWrap = document.querySelectorAll(".card_wrap");
    if(gameMode === "single"){
        if(case_showAnimation){
            cardWrap.forEach((card, idx)=>{
                setTimeout(() => {
                    card.classList.add("card_open")
                }, idx*200);
        
                setTimeout(() => {
                    card.classList.remove("card_open")
                }, idx*100+(cardWrap.length*200)+3000);
            })
            set_userDelay(cardWrap.length*300+3300);
        }else{
            userDelay = true;
            set_userDelay(300);
        }
    }else{
        set_userDelay(cardWrap.length*50+350);
    }
}
function pushOpenCard(idx){

    let targetCard = document.querySelectorAll(".card_wrap")[idx];

    openCard[idx] = targetCard.dataset.value;
    selectedCard.push(targetCard.dataset.value);

    targetCard.classList.add("card_open");
    targetCard.classList.add("opend");
}

function check_markingRight(){
    selectedCard = [];
    let defaultClass = "card_wrap correct ";
    // ++score_combo;
    gameMode === "single" ? 
        score_user += 100 * ++score_combo:
        whosTurn === "com"? score_com += 100 * ++score_combo: score_user+=100 * ++score_combo;
        
    for(let i of document.querySelectorAll(".card_open")){
        i.setAttribute("class", defaultClass+whosTurn);
    }
    
    for(let i of document.querySelectorAll(".correct")){
        openCard[i.dataset.index] = null
    };
    
    printScore();
    check_gameOver();
}
function check_markingWrong(){
    selectedCard = [];
    score_combo = 0;
    for(let i of document.querySelectorAll(".card_open")){
        i.classList.remove("card_open");
    }
    printScore();
}
function check_gameOver(){
    
    if(cardArrayCopy.length === document.querySelectorAll(".correct").length){
        switch_playing = false;
        count_stop();
        document.querySelector(".timer_wrap").setAttribute("class", "timer_wrap");
        document.querySelector(".gameOver_wrap").classList.add("active");

        if(gameMode === "single"){
            document.querySelector(".gameOver_inner").innerHTML = `
                <h2>게임 종료</h2>
                <p>최종점수 : ${score_user}</p>
                <div>
                    <p>게임이 끝났습니다.</p>
                    <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
                </div>
                <div class="group_btnInner">
                    <button type="button" class="btn_commonStyle btn_newGame single" onclick="newGame_single()">
                        <i class="fa-solid fa-rotate-right"></i>
                        새 게임<span></span>혼자
                    </button>
                    <button type="button" class="btn_commonStyle btn_newGame vs" onclick="newGame_vs()">
                        <i class="fa-solid fa-rotate-right"></i>
                        새 게임<span></span>대전
                    </button>
                </div>
            `
        }else{
            let result = [];
            if(score_com > score_user){
                result = ["패배", "패배했습니다"];
            }else if(score_com < score_user){
                result = ["승리", "승리했습니다"];
            }else{
                result = ["무승부", "비겼습니다"];
            }
            document.querySelector(".gameOver_inner").innerHTML = `
                <h2>${result[0]}</h2>
                <p>${score_user}점 : ${score_com}점으로 ${result[1]}.</p>
                <div>
                    <p>게임이 끝났습니다.</p>
                    <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
                </div>
            `
        }

    }
}

function turn_single(){
    document.querySelectorAll(".card_wrap").forEach((card, idx) => {

        card.addEventListener("click", e=>{
            if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                userDelay = false;

                pushOpenCard(idx);
                setTimeout(()=>{
                    if(selectedCard.length === 2){
                        if(!case_noCount){
                            count_stop();
                        }
                        if(selectedCard[0] === selectedCard[1]){
                            check_markingRight();
                        }else{
                            check_markingWrong();
                        }
                        setTimeout(()=>{
                            userDelay = true;
                            count_start();
                        }, timeDelay);
                    }else{
                        userDelay = true;
                    }
                }, timeDelay);
            }
        })
    });
}
function turn_user(){
    document.querySelectorAll(".card_wrap").forEach((card, idx) => {

        card.addEventListener("click", e=>{
            if(whosTurn === "user" && switch_playing){
                if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                    userDelay = false;
                    pushOpenCard(idx);

                    setTimeout(()=>{
                        
                        if(selectedCard.length === 2){
                            count_stop();
                            if(selectedCard[0] === selectedCard[1]){
                                check_markingRight();
    
                                if(turnContinuos){
                                    setTimeout(()=>{
                                        userDelay = true;
                                        count_start();
                                    }, 10)
                                }else{
                                    whosTurn = "com";
                                    score_combo = 0;
                                    printScore();
                                    for(let count = 0; count < 2; count++){
                                        setTimeout(turn_com, timeDelay * (count+1));
                                    };
                                }
    
                            }else{
                                check_markingWrong();
    
                                whosTurn = "com";
                                for(let count = 0; count < 2; count++){
                                    setTimeout(turn_com, timeDelay * (count+1));
                                }
                            }
                        }else{
                            userDelay = true;
                        }
                    }, timeDelay);

                }
            }
        })
    });
}
function turn_com(){
    if(switch_playing){
        count_comTurn();
        let com_idx;
        
        diceResult = dice();

        com_turnCount++;
    
        if(selectedCard.length){                                // 해당 턴에 선택된 카드가 있는 경우
            if(com_checkOpen(selectedCard[0])){                 // 현재 턴에 선택된 카드와 과거 오픈되었던 카드 중에 맞는 짝이 있는 경우
                // console.log("1-1");
                if(diceResult < difficulty.Select || pairCase){
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
                if(diceResult < difficulty.Pair){
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
            func_comDelayTimeOut= setTimeout(()=>{
                // checkMatching("com");
                if(selectedCard[0] === selectedCard[1]){
                    check_markingRight();
                    if(turnContinuos){
                        for(let count = 0; count < 2; count++){
                            setTimeout(turn_com, timeDelay * (count+1));
                        }
                    }else{
                        whosTurn = "user";
                        score_combo = 0;
                        printScore();
                        userDelay = true;
                        count_start();
                    }
                }else{
                    check_markingWrong();
                    whosTurn = "user";
                    userDelay = true;
                    count_start();
                }
            }, timeDelay);
        }
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

    let opendRatio = (document.querySelectorAll(".opend").length + document.querySelectorAll(".correct").length) / cardArrayCopy.length * 100;
    
    if((difficulty.Remains !== 0 && difficulty.Remains > opendRatio) || diceResult < difficulty.Opend){
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
        
        if(openCard[i] !== null){
            firstIndex = openCard.indexOf(openCard[i]);
            lastIndex = openCard.lastIndexOf(openCard[i]);
        }

        if(firstIndex !== lastIndex){
            break;
        }
    }
    return firstIndex !== lastIndex ? firstIndex: false;
}

function count_start(){
    if(switch_playing){
        document.querySelector(".timer_wrap").setAttribute("class", "timer_wrap user");
    
        if(!case_noCount){
            for(let i of document.querySelectorAll(".clockHands")){
                i.classList.add("animation");
            }
        
            func_countTimeOut = setTimeout(count_stop, count_origin*1000+500);
        
            count_copy = count_origin;
        
            document.querySelector(".timer_wrap .clockNum").innerText = count_copy;
            
            if(func_timeCounter === null){
                func_timeCounter = setInterval(()=>{
                    document.querySelector(".timer_wrap .clockNum").innerText = --count_copy;
                    if(count_copy === 0){
                        clearInterval(func_timeCounter);
                        func_timeCounter = null

                        check_markingWrong();
            
                        userDelay = true;
    
                        if(gameMode === "vs"){
                            whosTurn = "com";
                            
                            for(let count = 0; count < 2; count++){
                                setTimeout(turn_com, timeDelay * (count+1));
                            }
                        }else{
                            setTimeout(count_start, 1000);
                        }
                    }
                }, 1000);

            }
        }else{
            document.querySelector(".timer_wrap .clockNum").innerHTML = `<i class="fa-solid fa-infinity"></i>`;
        }

    }
    
    
}
function count_stop(){
    clearTimeout(func_countTimeOut);
    
    for(let i of document.querySelectorAll(".clockHands")){
        i.classList.remove("animation");
    }
    document.querySelector(".timer_wrap .clockNum").innerHTML = "";
    clearInterval(func_timeCounter);
    func_timeCounter = null;
    
    
}
function count_comTurn(){
    document.querySelector(".timer_wrap").setAttribute("class", "timer_wrap com");
    document.querySelector(".timer_wrap .clockNum").innerHTML = `<i class="fa-solid fa-robot"></i>`;
}

function option_cardNum(){
    document.querySelector("#input_cardNum").addEventListener("change", e=>{
        let num = e.currentTarget.value;
        if(num < 2){
            alert("2 이상의 수를 입력해주세요");
            e.currentTarget.value = 6;
        }else{
            e.currentTarget.value = parseInt(e.currentTarget.value);
        }
    })
}
function option_countTime(){
    document.querySelector("#input_countTime").addEventListener("change", e=>{
        let num = e.currentTarget.value;
        if(num < 1 || num > 99){
            alert("1초 ~ 99초 내에서 선택해주세요");
            e.currentTarget.value = 30;
        }else{
            e.currentTarget.value = parseInt(e.currentTarget.value);
        }
    })
}
function option_noCount(){
    let inputCheck = document.querySelector("#input_noCount"),
        inputNumber = document.querySelector("#input_countTime");
    
        inputCheck.addEventListener("input", ()=>{
            if(inputCheck.checked){
                inputNumber.parentNode.classList.add("disabled");
                inputNumber.disabled = true;
            }else{
                inputNumber.parentNode.classList.remove("disabled");
                inputNumber.disabled = false;
            }
    })
}
function option_cardResponsive(num){

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
function option_cardSize(){
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
}
function option_difficultyDetail(){
    let inputRange = document.querySelectorAll(".group_range input[type=range]");
    let inputNumber = document.querySelectorAll(".group_range input[type=number]");

    inputRange.forEach(i=>{
        i.addEventListener("input", e=>{
            difficulty_updateProgressBar(e.currentTarget, e.currentTarget.value);
            difficulty_updateOtherInput("number", e.currentTarget.dataset.category, e.currentTarget.value);
        })
    })

    inputNumber.forEach(i=>{
        i.addEventListener("change", e=>{
            let rangeDom = e.currentTarget.closest(".inputWrap").previousElementSibling;
            if(e.currentTarget.value < 0 || e.currentTarget.value > 100 || !e.currentTarget.value){
                alert("0 ~ 100 사이의 정수를 입력해주세요");
                e.currentTarget.value = rangeDom.value;
            }else{
                e.currentTarget.value = parseInt(e.currentTarget.value);
                difficulty_updateProgressBar(rangeDom, e.currentTarget.value);
                difficulty_updateOtherInput("range", e.currentTarget.dataset.category, e.currentTarget.value);
            }
        })
    })
}


function difficulty_updateProgressBar(targetDom, value){
    targetDom.style.background = `linear-gradient(to right, var(--color_main) ${value}%, #fff ${value}%)`;
}
function difficulty_updateOtherInput(targetType, targetDataCategory, value){
    document.querySelector(`input[type=${targetType}][data-category$=${targetDataCategory}]`).value = value;
}
function difficulty_selectBtn(){
    document.querySelectorAll("input[name=difficulty]").forEach(i=>{
        i.addEventListener("change", e=>{
            let selectValue = e.currentTarget.id;
            let var_difficulty;
            switch(selectValue){
                case "difficulty1":
                    var_difficulty = {
                        "Remains" : 0,
                        "Opend" : 0,
                        "NotOpen" : 0,
                        "Select" : 0,
                        "Pair" : 0,
                    }
                    break;
                case "difficulty2":
                    
                    var_difficulty = {
                        "Remains" : 0,
                        "Opend" : 0,
                        "NotOpen" : 100,
                        "Select" : 40,
                        "Pair" : 30,
                    }
                    break;
                case "difficulty3":
                    var_difficulty = {
                        "Remains" : 0,
                        "Opend" : 0,
                        "NotOpen" : 100,
                        "Select" : 80,
                        "Pair" : 70,
                    }
                    break;
                case "difficulty4":
                    var_difficulty = {
                        "Remains" : 10,
                        "Opend" : 50,
                        "NotOpen" : 100,
                        "Select" : 100,
                        "Pair" : 100,
                    }
                    break;
                default:
            }
            let loopArray = ["Remains", "Opend", "NotOpen", "Select", "Pair"];
            loopArray.forEach(i=>{
                let targetRange = document.querySelector(`input[type=range][data-category$=${i}]`);
                difficulty_updateProgressBar(targetRange, var_difficulty[i]);
                difficulty_updateOtherInput("range", i, var_difficulty[i]);
                difficulty_updateOtherInput("number", i, var_difficulty[i]);
            })

        })
    })


}




















