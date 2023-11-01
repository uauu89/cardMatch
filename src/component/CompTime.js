import { useState } from "react";

import css from "../css/CommonStyle.module.css";
import modal from "../css/OptionModal.module.css";

export default function CompTime(){

    const [timer, setTimer] = useState({
        count : 30, noLimit : -1
    });

    function timerValidation(val){
        if(val==="" || val<1){
            alert("1 ~ 99초 사이에서 입력해주세요");
            setTimer({...timer, count: 1});
            return false;
        }else if(val > 99){
            alert("1 ~ 99초 사이에서 입력해주세요");
            setTimer({...timer, count: 99});
            return false;
        }else{
            return true;
        }
    }

    console.log("input time render")
    return(
        <>
            <div className={`${modal.inputWrap} ${modal.textRight} ${timer.noLimit > 0 ? modal.disabled : ""}`}>
                <input type="number" id="input_countTime" min="1" max="99" 
                    value={timer.count}
                    className={modal.textRight}
                    disabled={timer.noLimit > 0 ? true : false}
                    onChange={e=>{
                        if(e.target.value===""){
                            setTimer({...timer, count : e.target.value})
                        }else if(Number(e.target.value)){
                            setTimer({...timer, count : parseInt(e.target.value)})
                        }else{
                            alert("1 ~ 99초 사이에서 입력해주세요");
                            setTimer({...timer, count: timer.count})
                        }
                    }}
                    onBlur={e=>{
                        timerValidation(e.target.value);
                    }}
                    onKeyDown={e=>{
                        if(e.key === "Enter"){
                            if(timerValidation(e.target.value)){
                                document.querySelector("#input_cardNum").focus();
                            };
                        }
                    }}
                />
                <span className={modal.unit}>s</span>
            </div>
            <div className={`${modal.checkboxWrap} ${modal.mobileGridRow2} ${modal.mobileGridCol2}`}>
                <label htmlFor="input_noCount" className={modal.cursorPointer}>제한 없음</label>
                <div className={`${modal.posRel} ${css.tabIndex}`} >
                    <input
                        type="checkbox" id="input_noCount"
                        className={modal.inputHidden}
                        onChange={()=>{
                            setTimer({
                                ...timer,
                                noLimit : timer.noLimit * -1
                            })
                        }}
                    />
                    <label htmlFor="input_noCount" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
                </div>
            </div>
        </>

    )
}