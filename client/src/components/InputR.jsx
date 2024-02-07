import { stagesContext } from "../helpers/context";
import motionvariants from "../helpers/motionVariants";
import { useContext } from "react";
import { motion } from "framer-motion";
import { TbStairsDown } from "react-icons/tb";

const InputR = ({
  register,
  shadows,
  setShadows,
  placeholdersApperance,
  setPlaceholdersApperance,
}) => {
  const { color, pOpacity, setPOpacity } = useContext(stagesContext);
  return (
    <motion.div
      className="relative w-[10rem] h-[7rem] pt-8"
      variants={motionvariants.itemTop}
    >
      {shadows.s1 && (
        <motion.div
          variants={motionvariants.itemShadow}
          className="bottom-[140px] z-[-10]  right-[-55px] absolute w-[17rem] h-[7rem] bg-transparent border-red-400"
          style={{ boxShadow: `0px 155px 50px -45px ${color.color}` }}
        >
          <motion.p
            className="absolute bottom-[-86%] left-[44.1%]"
            variants={motionvariants.itemShadow}
          >
            <TbStairsDown
              className="fade"
              style={{
                color: `${color.color}`,
                opacity: `${pOpacity.rowOpacity}%`,
                zIndex: -10,
              }}
              fontSize="2rem"
            />
          </motion.p>
        </motion.div>
      )}
      <motion.input
        {...register("rowInput", {
          required: true,
        })}
        type="number"
        onKeyDown={(evt) =>
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
        }
        min={1}
        id="r"
        className="bg-transparent font-bold z-40 text-center w-[10rem] tracking-[0.2rem] outline-none py-2 transition-all ease-in-out duration-700"
        style={{
          borderBottom: `1px solid ${color.color}`,
          color: `${color.color}`,
        }}
        onChange={(e) => {
          console.log(e.target.value.length);
          if (e.target.value.length > 0) {
            setPOpacity((prevOpacity) => {
              return {
                ...prevOpacity,
                rowOpacity: 8,
              };
            });
          } else {
            setPOpacity((prevOpacity) => {
              return {
                ...prevOpacity,
                rowOpacity: 30,
              };
            });
          }
          if (e.target.value.length <= 2) {
            setPlaceholdersApperance((prevVal) => {
              return {
                ...prevVal,
                row: e.target.value,
              };
            });
          } else {
            setPlaceholdersApperance((prevVal) => {
              return {
                ...prevVal,
                row: prevVal.row,
              };
            });
          }
        }}
        value={placeholdersApperance.row}
      />
    </motion.div>
  );
};

export default InputR;
