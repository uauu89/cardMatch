import { useEffect, useState } from "react";
import Card from "./Card";
import board from "../css/Gameboard.module.css";
import GameOverNotice from "./GameOverNotice";

export default function Gameboard(props){

    const [cardArraySetted, setCardArraySetted] = useState([]);

    
    const [arrayCorrect, setArrayCorrect] = useState([]);
    const [openCard, setOpenCard] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);

    const [turnCount, setTurnCount] = useState(0);



    /*--- setTimeout 변수들  ---*/
    const [timeoutLoadingComplete, setTimeoutLoadingComplete] = useState();
    const [timeoutCheckMatching, setTimeoutCheckMatching] = useState();
    const [timeoutTimeout, setTimeoutTimeout] = useState();
    // const [timeoutMarkingCorrect, setTimeoutMarkingCorrect] = useState();
    
    /*--- /setTimeout 변수들  ---*/


    function initClearTimeAll(){
        clearTimeout(timeoutLoadingComplete);
        clearTimeout(timeoutCheckMatching);
        clearTimeout(timeoutTimeout);
    }

    function resetProcess(){
        props.setWhosTurn("");
        setTurnCount(0);
        setSelectedCard([]);
    }
   

    function checkMatching(array){
        
        if(array[0] === array[1]){
            markingCorrect();
            addScore();
            arrayCorrectMod(array);
        }else{
            resetCombo();
        }
        removeClassOpencard();
        resetWhosTurn();
    }

    function markingCorrect(){
        document.querySelectorAll(".openCard").forEach(i=>{
            i.classList.remove("opend");
            i.classList.add("correct");
            i.classList.add(props.whosTurn);
        })
    }
    function addScore(){
        if(props.whosTurn==="com"){
            let score = props.score.com + (props.socre.comCombo+1) * 100
            props.setScore({
                ...props.score, 
                com : score,
                comCombo : props.score.comCombo + 1
            })
        }else{
            let score = props.score.user + (props.score.combo+1) * 100
            props.setScore({
                ...props.score, 
                user : score,
                combo : props.score.combo + 1
            })
        }
    }
    function arrayCorrectMod(array){
        array.forEach(correctNum=>{
            let tempArray = [...arrayCorrect];
            tempArray.forEach((item, idx)=>{
                if(correctNum === item){
                    tempArray[idx] = 0;
                }
            })
            setArrayCorrect(tempArray);
            checkGameover(tempArray);
        })
    }
    function checkGameover(array){
        let result = true;
        for(let i of array){
            if(i !== 0){
                result = false;
                break;
            }
        }
        if(result){
            props.setGameOver(true);
        }
    }
    function resetCombo(){
        if(props.whosTurn === "com"){
            props.setScore({
                ...props.score,
                comCombo : 0
            })
        }else{
            props.setScore({
                ...props.score,
                combo : 0
            })
        }
    }
    function removeClassOpencard(){
        document.querySelectorAll(".openCard").forEach(i=>i.classList.remove("openCard"));
    }
    function resetWhosTurn(){
        if(props.gameOver){
            props.setWhosTurn("gameover");
        }else{
            if(props.setting.mode === "single"){
                props.setWhosTurn("single");
            }else{
                props.setWhosTurn("com");
            }
        }
    }




    function pushOpenCard(e, idx, num){

        let condition1 = props.whosTurn === "single" || props.whosTurn === "user",
            condition2 = !e.currentTarget.classList.contains("openCard"),
            condition3 = !e.currentTarget.classList.contains("correct");

        if(condition1 && condition2 && condition3){

            e.currentTarget.classList.add("openCard");
            e.currentTarget.classList.add("opend");
    
            let openArray = [...openCard];
            openArray[idx] = num;
            setOpenCard(openArray);
            
            let selectedArray = [...selectedCard, num];
            setSelectedCard(selectedArray);

            if(turnCount === 1){
                resetProcess();
                let timerCheckMatching = setTimeout(()=>{
                    checkMatching(selectedArray);
                    clearTimeout(timerCheckMatching);
                }, 500)
                setTimeoutCheckMatching(timerCheckMatching)
            }else{
                setTurnCount(Number(turnCount)+1);
                setSelectedCard(selectedArray);
                
            }
            
        }
    }

    useEffect(()=>{
        function timeout(){
            if(props.timeout && !props.gameOver){
                removeClassOpencard();
                resetProcess();
                resetCombo();

                let timerTimeout = setTimeout(()=>{
                    props.setTimeout(false);
                    resetWhosTurn();
                    clearTimeout(timerTimeout);
                }, 500)

                setTimeoutTimeout(timerTimeout);

           }
        }

        timeout();
    }, [props.timeout])
    


    useEffect(()=>{

        function setCardArray(){
            let cardArray = [];
            let i = 0;
            while(i < props.setting.cardNum){
                cardArray.push(i+1);
                i++;
            }
            let suffleArray = [...cardArray, ...cardArray].sort(()=>Math.random() - 0.5);
            setCardArraySetted(suffleArray);
            setOpenCard(new Array(cardArray.length*2).fill(null))
            setArrayCorrect(suffleArray);
        }
        
        function gameStart(){
            
            // 카드 세팅 기본 애니메이션 시간 (카드개수+1 * 50 + 300)
            let loadingTimeDefault = (props.setting.cardNum * 2 + 1) * 50 + 300;
    
            // 싱글모드 카드 확인 애니메이션 (classAdd 200 + classRemove 200, 확인 3000)
            let loadingTimeCheck = props.setting.cardNum * 2 * 400 + 3000;

            let loadingTime;

            if(props.setting.mode === "single" && props.setting.checkCard){
                loadingTime = loadingTimeDefault + loadingTimeCheck;
            }else{
                loadingTime = loadingTimeDefault
            }

            let loadingComplete = setTimeout(()=>{
                // alert("loading complete")
                // setClickPrevent(true);
                clearTimeout(loadingComplete);
                props.setWhosTurn("single");
            }, loadingTime);
            setTimeoutLoadingComplete(loadingComplete);
        }

        function init(){            // 새 게임 초기화 함수
            props.setGameOver(false)
            props.setScore({single : 0, user : 0, com : 0, combo : 0, comCombo : 0})
            initClearTimeAll()      // setTimeout/setInterval 초기화
            setSelectedCard([]);    // 선택한 카드 내역 초기화
            setTurnCount([]);       // 카드 선택 횟수 초기화
            setCardArray();         // 카드 배열 생성
            gameStart();            // 카드애니메이션 완료 후 클릭 방지 해제
        }

        if(props.setting.newGame){
            init();
        }

    }, [props.setting])



    console.log("gameboard render")
    
    return(
        <div className={board.wrap}>
            {props.setting.newGame && cardArraySetted.length ?
                cardArraySetted.map((i, idx)=>
                    <Card 
                        key={idx}
                        idx={idx}
                        num={i}
                        cardLength={cardArraySetted.length}
                        mode={props.setting.mode}
                        checkCard={props.setting.checkCard}
                        openCard={openCard} setOpenCard={setOpenCard}
                        pushOpenCard={pushOpenCard}
                        // clickPrevent={clickPrevent}
                    /> ) :
                ""
            }
            <GameOverNotice 
                mode={props.setting.mode}
                gameOver={props.gameOver}
                score={props.score}
            />
        </div>
    )
}

