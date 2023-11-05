import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity, faRobot, faSpinner } from "@fortawesome/free-solid-svg-icons";
import timer from "../css/CompHeaderTimer.module.css";
import { useEffect, useState } from "react";

export default function CompHeaderTimer(props){


    const [setTimeTimer, setSetTimeTimer] = useState();


    function initClearTimeAll(){
        clearInterval(setTimeTimer);
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
        document.querySelector("#timerNumber").innerText = "";

        function modeSingle(){
            if(props.whosTurn && !props.noCount){
                let time = props.count;
                document.querySelector("#timerNumber").innerText = time;
    
                let timer = setInterval(()=>{
                    time--;
                    document.querySelector("#timerNumber").innerText = time;
                    if(time === 0){
                        clearInterval(timer);
                        props.setTimeout(true);
                        props.setWhosTurn("");
                        document.querySelector("#timerNumber").innerText = "";
                    }
                }, 1000)
                setSetTimeTimer(timer);
            }
        }

        modeSingle();

        return (()=>{
            initClearTimeAll();
        })
    }, [props])
    
    let timerTrigger = (props.whosTurn === "single" || props.whosTurn === "user") && !props.noCount;
    console.log("timer render")
    return(
        <div className={`${timer.timerWrap} ${timerTrigger? timer.animation:""}`}>
            <div className={`${timer.clockHands} ${timer.half}`}></div>
            <div className={`${timer.clockHands} ${timer.full}`}></div>
            <div className={`${timer.clockHands} ${timer.cover}`}></div>
            <div id="timerNumber" />
            <FontAwesomeIcon 
                className={timerTrigger ? timer.hidden: ""}
                icon={
                    props.whosTurn==="com" ? 
                    faRobot: 
                    props.noCount? faInfinity : faSpinner
                }
            />
        </div>
    )
}