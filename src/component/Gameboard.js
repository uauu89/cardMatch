import { useEffect, useState } from "react";
import Card from "./Card";
import board from "../css/Gameboard.module.css";
import GameOverNotice from "./GameOverNotice";
import CompCom from "./CompCom";

export default function Gameboard(props){

    const [cardArrayDefault, setCardArrayDefault] = useState([]);       // 원본 카드배열
    const [cardArrayOpend, setCardArrayOpend] = useState([]);           // 열어본 카드 >> null 배열에서 열어본 카드 데이터 추가 / 정답 카드 0으로 삭제
    const [cardArrayCorrect, setCardArrayCorrect] = useState([]);       // 정답 카드 >> 최초 배열에서 정답 카드 0으로 삭제
    const [cardArraySelected, setCardArraySelected] = useState([]);     // 선택한 카드

    const [turnCount, setTurnCount] = useState(0);

    const [comAlgorithm, setComAlgorithm] = useState();


    /*--- setTimeout 변수들  ---*/
    const [timeoutLoadingComplete, setTimeoutLoadingComplete] = useState();
    const [timeoutCheckMatching, setTimeoutCheckMatching] = useState();
    const [timeoutTimerTimeout, setTimeoutTimerTimeout] = useState();
    const [timeoutGameover, setTimeoutGameover] = useState();
    /*--- /setTimeout 변수들  ---*/

    function dice(){
        return Math.floor(Math.random()*100);
    }

    function initClearTimeAll(){
        clearTimeout(timeoutLoadingComplete);
        clearTimeout(timeoutCheckMatching);
        clearTimeout(timeoutTimerTimeout);
        clearTimeout(timeoutGameover);
    }
    function resetProcess(){
        props.setPlay(false);
        setTurnCount(0);
        setCardArraySelected([]);
    }



    function selectCard(dom, idx, num){

        let condition1 = props.whosTurn === "single" || props.whosTurn === "user",
            condition2 = props.play, 
            condition3 = !dom.classList.contains("openCard"),
            condition4 = !dom.classList.contains("correct");

        if(condition1 && condition2 && condition3 && condition4){
            pushOpenCard(dom, idx, num);
        }
    }
    function pushOpenCard(dom, idx, num){
        dom.classList.add("openCard");
        dom.classList.add("opend");

        let openArray = [...cardArrayOpend];
        openArray[idx] = num;
        setCardArrayOpend(openArray);
        
        let selectedArray = [...cardArraySelected, num];
        setCardArraySelected(selectedArray);

        if(turnCount === 1){
            resetProcess();
            let timerCheckMatching = setTimeout(()=>{
                checkMatching(selectedArray);
                clearTimeout(timerCheckMatching);
            }, 500)
            setTimeoutCheckMatching(timerCheckMatching)
        }else{
            setTurnCount(Number(turnCount)+1);
            setCardArraySelected(selectedArray);
        }
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
            let score = props.score.com + (props.score.comCombo+1) * 100
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
            let tempArrayCorrect = [...cardArrayCorrect],
                tempArrayOpend = [...cardArrayOpend];
            tempArrayCorrect.forEach((item, idx)=>{
                if(correctNum === item){
                    tempArrayCorrect[idx] = 0;
                    tempArrayOpend[idx] = 0;
                }
            })
            setCardArrayCorrect(tempArrayCorrect);
            setCardArrayOpend(tempArrayOpend);
            checkGameover(tempArrayCorrect);
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
            let timeGameover = setTimeout(()=>{
                props.setPlay(false);
                props.setWhosTurn("");
                clearTimeout(timeGameover);
            })
            setTimeoutGameover(timeGameover);
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
            alert("game over");
            props.setWhosTurn("");
            props.setPlay(false);
        }else{
            if(props.setting.mode === "vs"){
                if(props.whosTurn === "user"){
                    props.setWhosTurn("com");
                    setComAlgorithm(dice());
                }else{
                    props.setWhosTurn("user")
                }
            }
            props.setPlay(true);
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

                setTimeoutTimerTimeout(timerTimeout);

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
            setCardArrayDefault(suffleArray);
            setCardArrayOpend(new Array(cardArray.length*2).fill(null))
            setCardArrayCorrect(suffleArray);
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

            let whosTurn = props.setting.mode === "single" ? "single" : "user";

            let loadingComplete = setTimeout(()=>{
                props.setWhosTurn(whosTurn);
                props.setPlay(true);
                clearTimeout(loadingComplete);
            }, loadingTime);
            setTimeoutLoadingComplete(loadingComplete);
        }

        function init(){            // 새 게임 초기화 함수
            props.setGameOver(false);
            props.setPlay(false);
            props.setScore({single : 0, user : 0, com : 0, combo : 0, comCombo : 0})
            initClearTimeAll()              // setTimeout/setInterval 초기화
            setCardArraySelected([]);       // 선택한 카드 내역 초기화
            setTurnCount([]);               // 카드 선택 횟수 초기화
            setCardArray();                 // 카드 배열 생성
            setComAlgorithm(dice());        // 임시함수 -> 대전모드 시작 시 최초 턴 랜덤 기능 추가 대비 컴퓨터 동작확률 초기세팅
            gameStart();                    // 카드애니메이션 완료 후 클릭 방지 해제
        }

        if(props.setting.newGame){
            init();
        }

    }, [props.setting])



    console.log("gameboard render")
    
    return(
        <div className={board.wrap}>
            <CompCom
                setting={props.setting}
                cardArrayDefault={cardArrayDefault}
                cardArrayOpend={cardArrayOpend}
                cardArrayCorrect={cardArrayCorrect}
                cardArraySelected={cardArraySelected}
                turnCount={turnCount}
                play={props.play}
                whosTurn={props.whosTurn}
                gameOver={props.gameOver}
                pushOpenCard={pushOpenCard}
                comAlgorithm={comAlgorithm}
            />
            {props.setting.newGame && cardArrayDefault.length ?
                cardArrayDefault.map((i, idx)=>
                    <Card 
                        key={idx}
                        idx={idx}
                        num={i}
                        cardLength={cardArrayDefault.length}
                        mode={props.setting.mode}
                        checkCard={props.setting.checkCard}
                        selectCard={selectCard}
                    /> ) :
                ""
            }
            {props.gameOver?
            <GameOverNotice
                mode={props.setting.mode}
                gameOver={props.gameOver}
                score={props.score}
                startNewGame={props.startNewGame}
            /> : ""
            }
        </div>
    )
}

