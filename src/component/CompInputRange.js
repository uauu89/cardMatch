import { useEffect, useState } from "react"
import modal from "../css/OptionModal.module.css";
import range from "../css/CompInputRange.module.css"

export default function CompInputRange(props){

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
        
        <div className={range.rangeWrap}>
            <input
                type="range"
                id="detail_ratioRemains"
                // data-category="detail_ratioRemains" 
                tabIndex={-1}
                style={{background : `linear-gradient(to right, var(--color_main) ${inputVal}%, #fff ${inputVal}%)`}}
                value={inputVal}
                onChange={e=>setInputVal(e.target.value)}
            />
            <div className={`${modal.inputWrap} ${modal.textRight}`}>
                <input 
                    type="number" min="0" max="100"
                    data-category="detail_ratioRemains"
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
                />
                <span className={modal.unit}>%</span>
            </div>
        </div>
    )
}