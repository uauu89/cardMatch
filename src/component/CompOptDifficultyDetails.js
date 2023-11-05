import { useEffect, useState } from "react"
import modal from "../css/OptionModal.module.css";
import details from "../css/CompOptDifficultyDetails.module.css"

export default function CompOptDifficultyDetails(props){

    const [inputVal, setInputVal] = useState(props.data);
    // console.log("inputRange props.data : ", props.data)
    // console.log("inputVal : ", inputVal);

    function inputValidation(val){
        let num = Number(val);

        if(num % 1 > 0){
            return false
        }else if( num >= 0 && num <= 100){
            return true;
        }else{
            alert("0 ~ 100 사이의 정수를 입력해주세요");
            return false;
        }
    }

    useEffect(()=>{
        setInputVal(props.data);
    }, [props])

    console.log("inputrange render")
    return(
        
        <div className={details.rangeWrap}>
            <input
                type="range"
                id={`difficultyDetail_${props.id}`}
                // data-category="detail_ratioRemains" 
                tabIndex={-1}
                style={{background : `linear-gradient(to right, var(--color_main) ${inputVal}%, #fff ${inputVal}%)`}}
                value={inputVal}
                onChange={e=>setInputVal(e.target.value)}
            />
            <div className={`${modal.inputWrap} ${modal.textRight}`}>
                <input 
                    name="difficultyDetail"
                    type="number" min="0" max="100"
                    // data-category="detail_ratioRemains"
                    className={modal.textRight}
                    value={inputVal}
                    onInput={e=>{
                        console.log(typeof(e.target.value))
                        setInputVal(inputValidation(e.target.value)? e.target.value : inputVal);
                    }}
                    onBlur={e=>{
                        if(e.target.value===""){
                            setInputVal(0)
                        }
                    }}
                    onKeyDown={e=>{
                        console.log(e.key)
                        if(e.key==="Enter"){
                            // let nextInput = e.target.closest("li").nextSibling.querySelector("input[name=difficultyDetail]");
                            if(e.target.closest("li").nextSibling){
                                e.target.closest("li").nextSibling.querySelector("input[name=difficultyDetail]").focus();
                            }
                        }
                    }}
                />
                <span className={modal.unit}>%</span>
            </div>
        </div>
    )
}