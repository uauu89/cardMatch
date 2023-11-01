
import { useState } from "react";
import { useEffect } from "react";

import card from "../css/Card.module.css"

function Card(){

    const [click, setClick] = useState(-1)

    console.log("card render")

    return(
        <div className={`${card.wrap} ${click > 0? card.open: ""}`} onClick={()=>setClick(click * -1)}>
            <div className={`${card.card} ${card.front}`}>
                <div className={`${card.deco} ${card.border} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.right}`} />
                <div className={`${card.deco} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.bottom} ${card.left}`} />
                <div className={`${card.deco} ${card.bottom} ${card.right}`} />
                1
            </div>
            <div className={`${card.card} ${card.back}`}>
                <div className={`${card.deco} ${card.border} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.left}`} />
                <div className={`${card.deco} ${card.border} ${card.bottom} ${card.right}`} />
                <div className={`${card.deco} ${card.top} ${card.left}`} />
                <div className={`${card.deco} ${card.top} ${card.right}`} />
                <div className={`${card.deco} ${card.bottom} ${card.left} `} />
                <div className={`${card.deco} ${card.bottom} ${card.right}`} />
            </div>
        </div>
    )
}

export default Card;