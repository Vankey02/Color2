import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useContext } from "react";
import { stagesContext } from "../helpers/context";

const Bar = () => {
  const { vis, setVis, color, deg, input, setStage } =
    useContext(stagesContext);
  const item = {
    visible: {
      background: `conic-gradient(${color.color} ${deg}deg, #333 0deg)`,
      transition: { ease: "easeOut" },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setVis(deg);
    }, 200);
    if (deg === 360) {
      setTimeout(() => {
        setStage(2);
      }, 2100);
    }
  }, [deg]);
  return (
    <>
      <AnimatePresence>
        {vis !== 360 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
            }}
            className="z-30"
          >
            <motion.div
              variants={item}
              animate="visible"
              exit={{
                borderRadius: ["50%", "15%", "15%", "15%"],
                rotate: [0, -200, 300, 0],
                scale: [1, 1.1, 0, 0],
                transition: {
                  delay: 0.4,
                  duration: 1.4,
                  ease: "easeOut",
                },
              }}
              className="flex md:w-[19rem] md:h-[19rem] w-[15rem] h-[15rem] rounded-full justify-center items-center"
            >
              <motion.div
                exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.1 } }}
                className="absolute w-[12rem] h-[12rem]  md:w-[16rem] md:h-[16rem] bg-[#222] rounded-full"
              ></motion.div>
              <p
                className="absolute mt-8 text-3xl "
                style={{
                  color: `${color.color}`,
                }}
              >
                {input.toUpperCase()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Bar;
