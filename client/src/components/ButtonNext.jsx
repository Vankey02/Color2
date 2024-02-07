import { motion } from "framer-motion";
import motionvariants from "../helpers/motionVariants";
import { stagesContext } from "../helpers/context";
import { useContext } from "react";

const ButtonNext = () => {
  const { color } = useContext(stagesContext);
  return (
    <motion.button
      animate={{
        y: 0,
        backgroundColor: `${color.color}`,
        borderColor: `${color.color}`,
        borderWidth: `2px`,
        color: "#222",
        transition: { duration: 0.2 },
      }}
      whileHover={{
        y: -2,
        backgroundColor: `#222`,
        borderWidth: "2px",
        boxShadow: `0px 5px 14px 0px ${color.color}`,
        borderColor: `${color.color}`,
        color: `${color.color}`,
        transition: { duration: 0.2 },
      }}
      variants={motionvariants.itemBottom}
      className="px-8 py-2 rounded-md my-4 text-[#222] font-bold"
      style={{
        backgroundColor: `${color.color}`,
        borderColor: `${color.color}`,
        borderWidth: `2px`,
        color: "#222",
      }}
    >
      Submit
    </motion.button>
  );
};

export default ButtonNext;
