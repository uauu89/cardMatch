import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity, faRobot, faSpinner, faTrophy } from "@fortawesome/free-solid-svg-icons";
import timer from "../css/CompHeaderTimer.module.css";
import { useEffect, useState } from "react";

export default function CompHeaderTimer(props){


    const [setTimeTimer, setSetTimeTimer] = useState();
    const [intervalTimer, setIntervalTimer] = useState();


    function initClearTimeAll(){
        clearInterval(intervalTimer);
    }

    function setTimer(){
        
        if((props.whosTurn === "single" || props.whosTurn === "user") && !props.noCount){
            let time = props.count;
            document.querySelector("#timerNumber").innerText = time;

            let timer = setInterval(()=>{
                time--;
                document.querySelector("#timerNumber").innerText = time;
                if(time === 0){
                    clearInterval(timer);
                    props.setWhosTurn("com");
                    document.querySelector("#timerNumber").innerText = "";
                }
            }, 1000)
            
        }
    }


    function changeTime(){
        document.documentElement.style.setProperty("--turn_count", `${props.count}s`);
      }


    
    changeTime();

    

    useEffect(()=>{

        document.querySelector("#timerDisplay").innerText = "";
        initClearTimeAll();

        function modeSingleRenewal(){
            document.querySelector("#timerDisplay").innerText = props.count;
            let time = props.count;
            let timer = setInterval(()=>{
                time = time - 1;
                document.querySelector("#timerDisplay").innerText = time;
                if(time === 0){
                    clearInterval(timer);
                    props.setTimeout(true);
                    props.setWhosTurn("");
                }
            }, 1000)
            setIntervalTimer(timer);
        }

        if(!props.noCount  && !props.gameOver){
            if(props.whosTurn === "single"){
                modeSingleRenewal();
            }
        }
    }, [props.whosTurn])
    



    let condition1 = props.whosTurn === "single" || props.whosTurn === "user",
        condition2 = props.noCount === false,
        condition3 = props.gameOver === false;

    let timerTrigger = condition1 && condition2 && condition3;


    console.log("timer render")
    return(
        <div className={`${timer.timerWrap} ${timerTrigger? timer.animation:""}`}>
            <div className={`${timer.clockHands} ${timer.half}`}></div>
            <div className={`${timer.clockHands} ${timer.full}`}></div>
            <div className={`${timer.clockHands} ${timer.cover}`}></div>
            <div id="timerDisplay" />
            <FontAwesomeIcon 
                className={timerTrigger ? timer.hidden: ""}
                icon={
                    props.gameOver? faTrophy :  
                        props.whosTurn === "com" ? 
                            faRobot: 
                            props.noCount? faInfinity : faSpinner
                }
            />
        </div>
    )
}