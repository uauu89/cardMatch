import { useState, useEffect } from "react";
import css from "../css/CommonStyle.module.css";
import modal from "../css/OptionModal.module.css";

export default function CompOptCardSize(){

    const [cardSizeRatio, setCardSizeRatio] = useState(1)
    const [cardAutoSizing, setCardAutoSizing] = useState(true)

    function optAutoSizing(){
        if(cardAutoSizing){
            changeSizeBtn();
        }
    }
    function changeSizeBtn(){
        let width = window.innerWidth;
        if(width < 459){
            document.querySelector("#cardSizeS").click();
        }else if(width < 700){
            document.querySelector("#cardSizeM").click();
        }else{
            document.querySelector("#cardSizeL").click();
        }
    }

    useEffect(()=>{
        document.querySelector("#cardSizeL").click();
        if(cardAutoSizing){changeSizeBtn()}
    }, [])
    
    useEffect(()=>{
        window.addEventListener("resize", optAutoSizing)
        return ()=>window.removeEventListener("resize", optAutoSizing)
    }, [cardAutoSizing])

    useEffect(()=>{
        document.documentElement.style.setProperty("--cardSize_ratio", cardSizeRatio);
    }, [cardSizeRatio])

    return(
        <>
            <ul className={modal.btnWrap}>
                <li className={css.tabIndex}>
                    <input type="radio" name="cardSize" id="cardSizeL"
                        className={modal.inputHidden}
                        onChange={()=>setCardSizeRatio(1)}
                    />
                    <label htmlFor="cardSizeL" className={css.btnCommonStyle}>대</label>
                </li>
                <li className={css.tabIndex}>
                    <input type="radio" name="cardSize" id="cardSizeM"
                        className={modal.inputHidden} 
                        onChange={()=>setCardSizeRatio(0.8)}
                    />
                    <label htmlFor="cardSizeM" className={css.btnCommonStyle}>중</label>
                </li>
                <li className={css.tabIndex}>
                    <input type="radio" name="cardSize" id="cardSizeS"
                        className={modal.inputHidden}
                        onChange={()=>setCardSizeRatio(0.6)}
                    />
                    <label htmlFor="cardSizeS" className={css.btnCommonStyle}>소</label>
                </li>
            </ul>
            <div className={`${modal.checkboxWrap} ${modal.gridCol2}`}>
                <label htmlFor="input_autoSize" className={modal.cursorPointer}>화면 크기에 따라 자동 변경</label>
                <div className={`${modal.posRel} ${css.tabIndex}`} >
                    <input type="checkbox" id="input_autoSize"
                        className={modal.inputHidden}
                        checked = {cardAutoSizing}
                        onChange={e=>{
                            setCardAutoSizing(e.target.checked)
                            if(e.target.checked){changeSizeBtn();}
                            
                        }}
                    />
                    <label htmlFor="input_autoSize" className={`${modal.checkboxStyle} ${modal.cursorPointer}`} />
                </div>
            </div>
        </>
    )
}