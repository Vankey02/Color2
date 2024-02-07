import { motion } from "framer-motion";
import { useContext } from "react";
import { stagesContext } from "../helpers/context";
const StageOne = () => {
  const { color, scaleDeg, setInput, focus } = useContext(stagesContext);
  return (
    <motion.input
      type="email"
      ref={focus}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      exit={{ scale: 0, opacity: 0 }}
      className={"bg-[#333] focus:outline-none px-4 mt-8 rounded-sm w-32"}
      style={{ color: `${color.color}` }}
      onChange={(e) => {
        scaleDeg(e.target.value);
        setInput(e.target.value);
      }}
    />
  );
};

export default StageOne;
