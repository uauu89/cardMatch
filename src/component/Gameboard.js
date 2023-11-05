import Card from "./Card";
import board from "../css/Gameboard.module.css";
import { useEffect, useState } from "react";

export default function Gameboard(props){

    const [cardArraySetted, setCardArraySetted] = useState([]);
    const [openCard, setOpenCard] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);
    const [turnCount, setTurnCount] = useState(0);

    const [clickPrevent, setClickPrevent] = useState(false);


    /*--- setTimeout 변수들  ---*/
    const [setTimeLoadingComplete, setSetTimeloadingComplete] = useState();
    const [setTimeClickPrevent, setSetTimeClickPrevent] = useState()
    
    /*--- /setTimeout 변수들  ---*/


    function initClearTimeAll(){
        clearTimeout(setTimeLoadingComplete);
        clearTimeout(setTimeClickPrevent);
    }
    

    function removeClassOpencard(){
        document.querySelectorAll(".openCard").forEach(i=>i.classList.remove("openCard"));
    }

    function resetProcess(){
        props.setWhosTurn("");
        setTurnCount(0);
        setSelectedCard([]);
    }

    function resetWhosTurn(){
        setTimeout(()=>{
            if(props.setting.mode === "single"){
                props.setWhosTurn("single");
            }else{
                props.setWhosTurn("com");
            }
        }, 500)
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
            let score = props.score.user + props.score.combo+1 * 100
            props.setScore({
                ...props.score, 
                user : score,
                combo : props.score.combo + 1
            })
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
    function markingCorrect(){
        document.querySelectorAll(".openCard").forEach(i=>{
            i.classList.remove("opend");
            setTimeout(()=>{
                i.classList.add("correct");
                i.classList.add(props.whosTurn);
            }, 500)
        })
    }


    function checkMatching(array){
        console.log(array);
        if(array[0] === array[1]){
            markingCorrect();
            addScore();
        }else{
            resetCombo();
        }
    }


    function setClickEvent(){
        setClickPrevent(false);
            
        let setTimeClickPrevent = setTimeout(()=>{
            setClickPrevent(true);
            clearTimeout(setTimeClickPrevent);
        }, 500);

        setSetTimeClickPrevent(setTimeClickPrevent);
    }

    function pushOpenCard(e, idx, num){
        let condition1 = !e.currentTarget.classList.contains("openCard");
        let condition2 = !e.currentTarget.classList.contains("correct");

        if(clickPrevent && condition1 && condition2){
            setClickEvent();

            e.currentTarget.classList.add("openCard");
            e.currentTarget.classList.add("opend");
    
            let openArray = [...openCard];
            openArray[idx] = num;
            
            let selectedArray = [...selectedCard, num];
            setOpenCard(openArray);
            setSelectedCard(selectedArray);

            if(turnCount === 1){
                
                resetProcess();
                resetWhosTurn();
                checkMatching(selectedArray);
                setTimeout(()=>{
                    removeClassOpencard();
                }, 500)
            }else{
                setTurnCount(Number(turnCount)+1);
                setSelectedCard(selectedArray);
                
            }
            
        }
    }
    
    useEffect(()=>{
        function timeout(){
            if(props.timeout){
                props.setTimeout(false);
                removeClassOpencard();
                resetProcess();
                resetCombo();
                setClickEvent();
                resetWhosTurn();
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
            setCardArraySetted([...cardArray, ...cardArray].sort(()=>Math.random() - 0.5))
            setOpenCard(new Array(cardArray.length*2).fill(null))
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
                setClickPrevent(true);
                clearTimeout(loadingComplete);
                props.setWhosTurn("single");
            }, loadingTime);
            setSetTimeloadingComplete(loadingComplete);
        }

        function init(){            // 새 게임 초기화 함수
            initClearTimeAll()      // setTimeout/setInterval 초기화
            setSelectedCard([]);    // 선택한 카드 내역 초기화
            setTurnCount([]);       // 카드 선택 횟수 초기화
            props.setScore({single : 0, user : 0, com : 0, combo : 0, comCombo : 0})
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
                <p>테스트</p>
            }
        </div>
    )
}

