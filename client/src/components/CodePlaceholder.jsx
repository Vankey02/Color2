import { useEffect, useState, useContext } from "react";
import { stagesContext } from "../helpers/context";
import motionvariants from "../helpers/motionVariants";
import { motion } from "framer-motion";

const CodePlaceholder = ({ passLenght }) => {
  const { color, stage } = useContext(stagesContext);
  const [displayChain, setDisplayChain] = useState("**********");
  const [visible, setVisible] = useState(false);
  const getProperInput = (pass) => {
    let dots = 11;
    let chain = "";
    let spaces = "           ";
    for (var i = 0; i < dots - pass.length; i++) {
      console.log("petla" + i);

      spaces = spaces.slice(0, spaces.length - 1);
      chain = chain.concat("•");
    }

    setDisplayChain(spaces + chain);
  };

  useEffect(() => {
    if (stage == 3) {
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    }
  }, [stage]);
  useEffect(() => {
    getProperInput(passLenght);
  }, [passLenght]);
  return (
    <>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute "
        >
          <div className="relative z-3 w-[10rem] h-[2.6rem]">
            <input
              className="absolute placeholderfont top-0 opacity-30 pl-[18px] w-[10rem] z-0 bg-transparent  tracking-[0.2rem] py-2 outline-none left-0"
              type="text"
              value={displayChain}
              readOnly
              autoComplete="off"
              style={{ color: `${color.color}` }}
            />
            <p
              className="absolute top-[18%]"
              style={{ color: `${color.color}` }}
            >
              #
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CodePlaceholder;
