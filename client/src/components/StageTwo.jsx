import { motion } from "framer-motion";
import motionvariants from "../helpers/motionVariants.js";
import { useContext, useState } from "react";
import { stagesContext } from "../helpers/context.js";
import { PulseLoader } from "react-spinners";
import axios from "axios";
const StageTwo = () => {
  const { color, setStage, mail, setMail } = useContext(stagesContext);
  const [buttonSwitch, setButtonSwitch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (cb, delay = 1000) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        console.log(...args);

        cb(...args);
      }, delay);
    };
  };
  const updateDebouceText = debounce(async (val) => {
    if (val == import.meta.env.VITE_ROOT_PANEL) {
      setStage(5);
    } else if (
      val.length >= 5 &&
      val.includes("@") &&
      val.includes(".") &&
      val != import.meta.env.VITE_ROOT_PANEL
    ) {
      setIsLoading(true);
      setMail(val);

      await axios
        .post(import.meta.env.VITE_CHECK_LOGIN_PATH, { user: val })
        .then((e) => {
          console.log(e.data);
          setButtonSwitch(e.data);
        });
      setIsLoading(false);
    } else {
      setButtonSwitch(false);
    }
  });
  console.log("render!");
  return (
    <motion.div
      className="flex flex-col items-center"
      variants={motionvariants.variantStageTwo}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        style={{ color: `${color.color}` }}
      >
        Your ID please
      </motion.p>
      <motion.input
        variants={motionvariants.itemTop}
        className="bg-transparent outline-none py-2 m-8"
        style={{
          borderBottom: `1px solid ${color.color}`,
          color: `${color.color}`,
        }}
        autoCapitalize="none"
        onChange={(e) => {
          updateDebouceText(e.target.value);
        }}
      />
      {isLoading && <PulseLoader color={`${color.color}`} />}
      {buttonSwitch && (
        <motion.button
          whileHover={{
            scale: [null, 1.4, 1.3],
            transition: { duration: 0.3 },
          }}
          className="rounded-xl p-4 text-[#222] font-bold"
          style={{ backgroundColor: `${color.color}` }}
          variants={motionvariants.itemBottom}
          onClick={async () => {
            setStage((prevStage) => prevStage + 1);
            try {
              await axios
                .post(import.meta.env.VITE_LOG_PATH, { mail: mail })
                .then((e) => {
                  console.log("fhdjak!!!!!!!!!!!");
                });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Go Next
        </motion.button>
      )}
    </motion.div>
  );
};

export default StageTwo;
