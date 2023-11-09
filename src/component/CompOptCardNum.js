import { useState } from "react";
import modal from "../css/OptionModal.module.css";

export default function CompOptCardNum(){
    
    const [cardNum, setCardNum] = useState(6);

    function cardNumValidation(val){
        if(val === "" || val < 2){
            alert("2 이상의 카드 범위를 입력해주세요");
            setCardNum(2)
            return false;
        }else{
            return true;
        }
    }

    return(
        <div className={`${modal.inputWrap} ${modal.textRight}`}>
        <input
            type="number" id="inputCardNum" min="2"
            value={cardNum}
            className={modal.textRight}
            onChange={e=>{
                if(e.target.value === ""){
                    setCardNum(e.target.value)
                }else if(Number(e.target.value)){
                    setCardNum(parseInt(e.target.value))
                }else{
                    alert("2 이상의 카드 범위를 입력해주세요");
                    setCardNum(cardNum);
                }
            }}
            onBlur={e=>{
                cardNumValidation(e.target.value);
            }}
            onKeyDown={e=>{
                if(e.key === "Enter"){
                    if(cardNumValidation(e.target.value)){
                        document.querySelector("#inputTimer").focus();
                    };
                }
            }}
        />
        <span className={modal.unit}></span>
    </div>
    )
}