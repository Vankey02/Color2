import { motion } from "framer-motion";
import motionvariants from "../helpers/motionVariants";
import { useContext } from "react";
import { stagesContext } from "../helpers/context";
import CodePlaceholder from "./CodePlaceholder";

const CodeInput = ({
  register,
  placeholdersApperance,
  setPlaceholdersApperance,
  shadows,
  setShadows,
}) => {
  const { color } = useContext(stagesContext);
  return (
    <motion.div
      className="relative w-[11rem] h-[7rem] pt-8"
      variants={motionvariants.itemRight}
    >
      {shadows.s3 && (
        <motion.div
          variants={motionvariants.itemShadow}
          className="bottom-[140px] z-[-10] right-[-55px] absolute w-[17rem] h-[7rem] bg-transparent border-red-400"
          style={{ boxShadow: `0px 155px 50px -45px ${color.color}` }}
        ></motion.div>
      )}
      <motion.input
        {...register("codeInput", {
          required: "Code is required!",
          minLength: { value: 11, message: "Input every character!" },
        })}
        type="number"
        onKeyDown={(evt) =>
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
        }
        id="code"
        className="absolute w-[11rem] z-40 font-semibold bg-transparent tracking-[0.2rem] outline-none pl-[18px] py-2  transition-all ease-in-out duration-700 left-0"
        style={{
          borderBottom: `1px solid ${color.color}`,
          color: `${color.color}`,
        }}
        min={0}
        onChange={(e) => {
          console.log(e.target.value.length);
          if (e.target.value.length <= 11) {
            setPlaceholdersApperance((prevVal) => {
              return {
                ...prevVal,
                code: e.target.value,
              };
            });
          } else {
            setPlaceholdersApperance((prevVal) => {
              return {
                ...prevVal,
                code: prevVal.code,
              };
            });
          }
        }}
        value={placeholdersApperance.code}
      />
      <CodePlaceholder passLenght={placeholdersApperance.code} />
    </motion.div>
  );
};

export default CodeInput;
