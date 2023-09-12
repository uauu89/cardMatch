let cardArray, openCard, cardArrayCopy, matchCard;
let userDelay = false;

let com_tunrCount = 0;

let userSelectedCard = [];

let timeDelay = 500;
/*
모든 인덱스값을 가진 배열에서 맞춘 카드의 인덱스 값을 replice로 제거를 하는게 더 낫지 않을까
> 오픈되었던 카드인지 아닌지 구별 불가능
> 현재 오픈된 카드인지 아닌지 구별 불가능


함수화 할 것들
openCard에 인덱스번호 추가하는 것만 (타이머와 분리)
짝을 맞췄을 경우 correct 판정하기 (변수로 유저 = 0 /컴퓨터 = 1 구분해서 누가 맞췄는지 구분하도록 작성?)

현재 aiTest 문제점

openCard 배열에 각 인덱스 위치에 카드번호를 저장
그런데 aiArray에서 x를 제거하고 value값을 인덱스번호로 이용해서 오류


*/

document.querySelector("#newGame").addEventListener("click", e=>{
    init();
})

function init(){  
    setCardArray();
    cardShuffleSimple(cardArrayCopy);
    insertCard(cardArrayCopy);
    
    cardCheck(false);


    turn_user();

}

    function setCardArray(){
        cardArray = [];
        let i = 0;
        while(i < document.querySelector("#inputNum").value){
            cardArray.push(i+1)
            i++;
        }

        cardArrayCopy = [...cardArray, ...cardArray];
        openCard = "x".repeat(cardArray.length*2).split("");
    }

    function cardShuffleSimple(array){
        array.sort(()=>Math.random() - 0.5);
    }

    function insertCard(array){
        let dom_insertHTML = "";
        array.forEach((i, idx)=>{
            dom_insertHTML += `
            <div class="card_wrap" data-value=${i} data-index=${idx}>
                <div class="card card_front">${i}</div>
                <div class="card card_back"></div>
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



function pushOpenCard(idx){

    let targetValue = document.querySelectorAll(".card_wrap")[idx].dataset.value;

    openCard[idx] = targetValue;
    userSelectedCard.push(targetValue);

    document.querySelectorAll(".card_wrap")[idx].classList.add("card_open");
    document.querySelector("#test_openArray").innerHTML = openCard;
}

function checkMatching(who){
    let winner = "";
    if(userSelectedCard[0] === userSelectedCard[1]){
        who === "user"? winner = "card_wrap correct user": winner = "card_wrap correct com";
        for(let i of document.querySelectorAll(".card_open")){
            i.setAttribute("class", winner);
        }
    }else{
        for(let i of document.querySelectorAll(".card_open")){
            i.classList.remove("card_open");
        }
    }

    userSelectedCard = [];
}


function turn_user(){
    
    document.querySelectorAll(".card_wrap").forEach((card, idx) => {

        card.addEventListener("click", e=>{

            if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                userDelay = false;

                pushOpenCard(idx);
                setTimeout(()=>{
                    userDelay = true;

                    if(userSelectedCard.length === 2){
                        checkMatching("user");

                    }
                }, timeDelay);
            }
        })
    });
}
function turn_com(){
    // const getElCount = arr => arr.reduce((ac, v) => (
    //     { ...ac, [v]: (ac[v] || 0) + 1 }), {});
    
    // const array = ['A', 'B', 'C', 'D', 'A', 'A', 'C', 'E', 'D', 'E', 'A'];
    // const test = getElCount(array);
    // console.log(test);

    // console.log(document.querySelectorAll(".card_wrap:not(.correct)").length);
    // let aiArray = [...document.querySelectorAll(".card_wrap:not(.correct)")].sort(()=>Math.random() - 0.5);
    // let aiArray = openCard.filter((num)=>{
    //     return num !== "x";
    // });

    let aiArray = [];

    openCard.forEach((i, idx)=>{
        if(i !== "x"){
            aiArray.push(idx);
        }
    })
    
    if(aiArray.length){
        aiArray.sort(()=>Math.random() - 0.5);
        let firstIndex =aiArray.shift();
        document.querySelectorAll(".card_wrap:not(.correct)")[firstIndex].classList.add("card_open");
        setTimeout(()=>{
            let secondIndex = aiArray.shift();
            document.querySelectorAll(".card_wrap:not(.correct)")[secondIndex].classList.add("card_open");
        }, 300)

        setTimeout(()=>{
            for(let i of document.querySelectorAll(".card_open")){
                i.classList.remove("card_open");
            }
        }, 1000)

    }else{
        console.log("aiArray false");
    }
}

function com_createArray(){
    let openCardMod = [];
    openCard.forEach((i, idx)=>{
        if(i !== "x"){
            openCardMod.push(idx);
        }
    })

    let test_openArray = [...openCardMod].sort(()=>Math.random() - 0.5);
    if(test_openArray.length){
        let idx = test_openArray.shift();
        pushOpenCard(idx);
    }else{
        test_openArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
        let randomNum = Math.floor(Math.random()*test_openArray.length);
        pushOpenCard(randomNum);
    }
}





/* ----------------------------------------- */
function com_selectRandom(){
    let noOpenArray = document.querySelectorAll(".card_wrap:not(.correct):not(.card_open)");
    let selectedIdx = noOpenArray[Math.floor(Math.random()*noOpenArray.length)].dataset.index;
    pushOpenCard(selectedIdx);
}

function com_selectOpen(){
    
}


function com_turn(){

    if(true){   //나중에 matchCard t/f 조건 추가
        com_selectRandom();
        com_tunrCount++;
        document.querySelector("#test_etc").innerHTML = userSelectedCard;
    }
    if(com_tunrCount === 2){
        com_tunrCount = 0;
        setTimeout(()=>checkMatching("com"), timeDelay);
    }
}

// matchCard
/* ----------------------------------------- */





document.querySelector("#aiTest").addEventListener("click", e=>{
    com_turn();
})
document.querySelector("#checkArray").addEventListener("click", e=>{
    com_createArray();
})