// import './App.css';
import Header from "./component/Header";

import Gameboard from "./component/Gameboard";
import app from "./css/App.module.css";
import { useEffect, useState } from "react";
function App() {


  const [cardNum, setCardNum] = useState(1)
  const [timer, setTimer] = useState({
    count : 30, noLimit : -1
  })
  const [difficulty, setDifficulty] = useState({
    remains: 0, opend : 0, notOpen : 0, select : 0, pair : 0
  });
  const [cardSizeRatio, setCardSizeRatio] = useState(1)

  const [setting, setSetting] = useState({
    start : false,
    cardNum : 0,
    count : 0,
    noCount : false,
    checkCard : true,
    keepTurn : false,
    remains : 0,
    opend : 0,
    notOpen : 0,
    select : 0,
    pair : 0,
  })

  useEffect(()=>{

    function option_changeCardSize(){
      document.documentElement.style.setProperty("--cardSize_ratio", cardSizeRatio);
    }

    option_changeCardSize();
  }, [cardSizeRatio])






  console.log("App render");
  return (
    <>
      <Header 
        cardNum={cardNum} setCardNum={setCardNum}
        // difficulty={difficulty} setDifficulty={setDifficulty}
        // timer={timer} setTimer={setTimer}
        setSetting={setSetting}
        setCardSizeRatio={setCardSizeRatio}
      />
      <Gameboard
        setting={setting}
      />
    </>
  );
}

export default App;
