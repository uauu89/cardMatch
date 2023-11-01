import Card from "./Card";
import board from "../css/Gameboard.module.css";


function Gameboard(props){


    console.log("gameboard render")

    return(
        <div className={board.wrap}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <p>{props.setting.start}</p>
            <p>{props.setting.cardNum}</p>
            <p>{props.setting.count}</p>
            <p>{props.setting.noCount}</p>
            <p>{props.setting.checkCard}</p>
            <p>{props.setting.keepTurn}</p>
            <p>{props.setting.remains}</p>
            <p>{props.setting.opend}</p>
            <p>{props.setting.notOpend}</p>
            <p>{props.setting.select}</p>
            <p>{props.setting.pair}</p>
        </div>
    )
}

export default Gameboard;