let cardArray, openCard, cardArrayCopy;
let userDelay = false;

let whosTurn = 0;

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
    
    cardCheck();


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

    function cardCheck(){
        document.querySelectorAll(".card_wrap").forEach((card, idx)=>{
            setTimeout(() => {
                card.classList.add("card_open")
            }, idx*200);

            setTimeout(() => {
                card.classList.remove("card_open")
            }, idx*100+(cardArray.length*2*200)+3000);
        })
        setTimeout(()=>{userDelay = true}, (cardArray.length*2*300+3000));
    }



function pushOpenCard(idx, value){
    openCard[idx] = value;
    document.querySelectorAll(".card_wrap")[idx].classList.add("card_open");
}

function checkMatching(arr, who){
    let winner = "";
    if(arr[0] === arr[1]){
        who === 0? winner = "card_wrap correct user": winner = "card_wrap correct com";
        for(let i of document.querySelectorAll(".card_open")){
            i.setAttribute("class", winner);
        }
    }else{
        for(let i of document.querySelectorAll(".card_open")){
            i.classList.remove("card_open");
        }
    }
}


function gamePlay(){
    turn_user();
}

    function turn_user(){
        let userSelectedCard = [];
        document.querySelectorAll(".card_wrap").forEach((card, idx) => {

            card.addEventListener("click", e=>{

                if(userDelay && !card.classList.contains("card_open") && !card.classList.contains("correct")){
                    userDelay = false;

                    // e.currentTarget.classList.add("card_open");
                    // openCard[idx] = e.currentTarget.dataset.value;

                    pushOpenCard(idx, e.currentTarget.dataset.value);

                    userSelectedCard.push(e.currentTarget.dataset.value);

                    setTimeout(()=>{
                        userDelay = true;

                        if(userSelectedCard.length === 2){
                            checkMatching(userSelectedCard, whosTurn);

                            // if(userSelectedCard[0] === userSelectedCard[1]){
                            //     console.log("match success")
                            //     for(let i of document.querySelectorAll(".card_open")){
                            //         i.setAttribute("class", "card_wrap correct user");
                            //     }
                            // }else{
                            //     for(let i of document.querySelectorAll(".card_open")){
                            //         i.classList.remove("card_open");
                            //     }
                            // }
                            userSelectedCard = [];
                        }
                    }, 500);
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
            console.log("origin array : ", aiArray);
            let firstIndex = Number(aiArray.shift());
            console.log("firstIndex : ", firstIndex);
            console.log("remove firstIndex : ", aiArray);
            document.querySelectorAll(".card_wrap:not(.correct)")[firstIndex].classList.add("card_open");
            setTimeout(()=>{
                let secondIndex = Number(aiArray.shift());
                console.log("secondIndex : ", secondIndex);
                document.querySelectorAll(".card_wrap:not(.correct)")[secondIndex].classList.add("card_open");
                console.log("remove secondIndex : ", aiArray);
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


document.querySelector("#aiTest").addEventListener("click", e=>{
    turn_com();
})

    function checkPair(){
        let checkArray = [];

        // document.querySelectorAll(".card_wrap:not(.correct)")
    }
    
/*
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
*/


let cardWrap = document.querySelectorAll(".card_wrap"),
    notice = document.querySelector(".notice span")
    

let checkCardNum = 2,
    selectedNum = [],
    score = 0;

notice.innerText = score;



// 인덱스 번호 구하기 위해 forEach로 바꾸기







/*
for(let i of cardWrap){
    i.addEventListener("click", (e)=>{
        // console.log(e.currentTarget.dataset.value);
        if(!e.currentTarget.classList.contains("card_open") && !e.currentTarget.classList.contains("correct") && checkCardNum < 2){
            i.classList.add("card_open");
            checkCardNum++;
            // console.log(e.currentTarget.dataset.value)
            selectedNum.push(e.currentTarget.dataset.value);
            console.log(selectedNum);
            if(checkCardNum == 2){
                setTimeout(()=>{
                    if(selectedNum[0] == selectedNum[1]){
                        for(let j of document.querySelectorAll(".card_open")){
                            j.setAttribute("class", "card_wrap correct");
                        }
                        score += 100
                    }else{
                        for(let j of cardWrap){
                            j.classList.remove("card_open");
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
*/