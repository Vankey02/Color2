import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Bar from "./components/Bar.jsx";
import "./App.css";
import colorsArray from "./helpers/colors.js";
import StageOne from "./components/StageOne.jsx";
import StageTwo from "./components/StageTwo.jsx";
import StageThree from "./components/StageThree.jsx";
import ImgDownloadButton from "./components/ImgDownloadButton.jsx";
import { stagesContext } from "./helpers/context.js";
import RootPanel from "./components/RootPanel.jsx";

function App() {
  const focus = useRef();
  const imgInputRef = useRef();
  const [userID, setUserID] = useState("");
  const [download, setDownload] = useState({});
  const [imgInput, setImgInput] = useState({});
  const [deg, setDeg] = useState(0);
  const [mail, setMail] = useState("");
  const [color, setColor] = useState(
    colorsArray[Math.floor(Math.random() * colorsArray.length)]
  );
  const [vis, setVis] = useState(0);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState(0);
  const [placeholdersApperance, setPlaceholdersApperance] = useState({
    row: "",
    col: "",
    code: "",
  });
  const [pOpacity, setPOpacity] = useState({
    rowOpacity: 30,
    colOpacity: 30,
  });

  const scaleDeg = (input) => {
    let similarity;
    let counter = 0;
    for (let i = 0; i < color.name.length; i++) {
      if (
        input.charAt(i).toLocaleLowerCase() ===
        color.name.charAt(i).toLocaleLowerCase()
      ) {
        counter++;
      }
    }
    similarity = (counter / color.name.length) * 100;
    console.log("similarity: " + similarity + "%");
    if (similarity === 100) {
      focus.current.blur();
    }
    setDeg((similarity * 360) / 100);
    console.log(input);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center min-w-screen min-h-screen mr-0">
        <stagesContext.Provider
          value={{
            color,
            setColor,
            userID,
            setUserID,
            deg,
            scaleDeg,
            imgInput,
            setImgInput,
            download,
            setDownload,
            focus,
            imgInputRef,
            stage,
            setStage,
            input,
            setInput,
            vis,
            setVis,
            pOpacity,
            setPOpacity,
            mail,
            setMail,
            placeholdersApperance,
            setPlaceholdersApperance,
          }}
        >
          <Bar
            vis={vis}
            setVis={setVis}
            colorBar={color}
            deg={deg}
            input={input}
            setStage={setStage}
          />

          <AnimatePresence>{deg !== 360 && <StageOne />}</AnimatePresence>
          <AnimatePresence>{stage === 2 && <StageTwo />}</AnimatePresence>
          <AnimatePresence>{stage === 3 && <StageThree />}</AnimatePresence>
          <AnimatePresence>
            {stage === 4 && <ImgDownloadButton />}
          </AnimatePresence>
          <AnimatePresence>{stage === 5 && <RootPanel />}</AnimatePresence>
        </stagesContext.Provider>
      </div>
    </>
  );
}

export default App;
