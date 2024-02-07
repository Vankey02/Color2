import motionvariants from "../helpers/motionVariants";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { stagesContext } from "../helpers/context";
import { RiDownloadCloud2Fill, RiDownloadCloud2Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const ImgDownloadButton = () => {
  const { color, mail, placeholdersApperance, download } =
    useContext(stagesContext);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonPresence, setButtonPresence] = useState(true);
  const [messageVis, setMessageVis] = useState(false);
  return (
    <motion.div
      variants={motionvariants.variantStageFour}
      initial="hidden"
      animate="visible"
      className="items-center justify-center w-[15rem] h-[10rem]"
    >
      <motion.div className="relative w-[14rem] h-[8rem]">
        {messageVis && (
          <motion.div
            className="absolute left-0 right-0 top-[160px] mx-auto text-center"
            style={{
              color: `${color.color}`,
            }}
            variants={motionvariants.messagesContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              style={{
                color: `${color.color}`,
              }}
              variants={motionvariants.item}
            >
              All done!
            </motion.div>
            <motion.div
              style={{
                color: `${color.color}`,
              }}
              variants={motionvariants.item}
            >
              Dont forget to support
            </motion.div>
            <motion.div
              style={{
                color: `${color.color}`,
              }}
              variants={motionvariants.item}
            >
              :)
            </motion.div>
          </motion.div>
        )}
        {buttonPresence ? (
          <motion.a
            onClick={async () => {
              console.log("donwload click");
              setButtonPresence(false);
              setMessageVis(true);
              try {
                await axios
                  .post(import.meta.env.VITE_TIC_PATH, {
                    mail: mail,
                    row: placeholdersApperance.row,
                    col: placeholdersApperance.col,
                    num: placeholdersApperance.code,
                    time: new Date(),
                  })
                  .then((e) => {
                    console.log("fhdjak!!!!!!!!!!!");
                  });
              } catch (e) {
                console.log(e);
              }
            }}
            //exit={{ opacity: 0, transition: { duration: 2 } }}
            onHoverStart={() => {
              if (!isHovered) {
                setIsHovered((prevVal) => !prevVal);
              }
            }}
            onHoverEnd={() => {
              if (isHovered) {
                setIsHovered((prevVal) => !prevVal);
              }
            }}
            whileHover={{
              scale: [null, 1.4, 1.3],
              backgroundColor: ["#222", "#222", "#222"],
              borderColor: [
                `${color.color}`,
                `${color.color}`,
                `${color.color}`,
              ],
              boxShadow: [
                `0px 0px 0px 0px ${color.color}`,
                `0px 0px 0px 0px ${color.color}`,
                `0px 0px 24px 0px ${color.color}`,
              ],
              transition: { duration: 0.3 },
            }}
            href={download}
            variants={motionvariants.item}
            download="file.png"
            className="absolute w-[7rem] h-[4rem] inset-0 m-auto rounded-lg text-[#222] font-bold cursor-pointer "
            style={{
              backgroundColor: `${color.color}`,
              borderWidth: 2,
              borderColor: "#222",
            }}
          >
            {isHovered ? (
              <RiDownloadCloud2Line
                fontSize="2rem"
                style={{
                  color: `${color.color}`,
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                }}
              />
            ) : (
              <RiDownloadCloud2Fill
                fontSize="2rem"
                style={{ position: "absolute", inset: 0, margin: "auto" }}
              />
            )}
          </motion.a>
        ) : (
          <motion.div
            className="absolute inset-0 m-auto"
            variants={motionvariants.itemAccept}
          >
            <FaCheck
              fontSize="4rem"
              style={{
                color: `${color.color}`,
                //borderWidth: 2,
                position: "absolute",
                inset: 0,
                margin: "auto",
                //borerColor: "blue",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImgDownloadButton;
