import { motion } from "framer-motion";
import QRCode from "qrcode";
import { useContext, useEffect, useState, useRef } from "react";
import { stagesContext } from "../helpers/context";
import motionvariants from "../helpers/motionVariants";
import { useForm } from "react-hook-form";
import CodeInput from "./CodeInput";
import ButtonNext from "./ButtonNext";
import InputR from "./InputR";
import InputC from "./InputC";

const StageThree = () => {
  const [shadows, setShadows] = useState({ s1: false, s2: false, s3: false });

  useEffect(() => {
    setTimeout(() => {
      setShadows((prevShadow) => {
        return { ...prevShadow, s1: true };
      });
    }, 2800);
    setTimeout(() => {
      setShadows((prevShadow) => {
        return { ...prevShadow, s2: true };
      });
    }, 3000);
    setTimeout(() => {
      setShadows((prevShadow) => {
        return { ...prevShadow, s3: true };
      });
    }, 3200);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    setStage,
    setDownload,
    placeholdersApperance,
    setPlaceholdersApperance,
  } = useContext(stagesContext);
  return (
    <motion.form
      autoComplete="off"
      className="flex flex-col items-center mx-8 "
      variants={motionvariants.variantStageThree}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, display: "none", transition: { duration: 0.2 } }}
      onSubmit={handleSubmit((data) => {
        console.log("Form submited!");
        console.log(data);
        QRCode.toDataURL(data.codeInput)
          .then((url) => {
            console.log(url);
            setDownload(url);
          })
          .catch((err) => {
            console.error(err);
          });

        setStage((prevStage) => prevStage + 1);
      })}
    >
      <InputR
        register={register}
        shadows={shadows}
        setShadows={setShadows}
        placeholdersApperance={placeholdersApperance}
        setPlaceholdersApperance={setPlaceholdersApperance}
      />
      {errors.rowInput && (
        <span className="text-[#555]">This field is required!</span>
      )}
      <InputC
        register={register}
        shadows={shadows}
        setShadows={setShadows}
        placeholdersApperance={placeholdersApperance}
        setPlaceholdersApperance={setPlaceholdersApperance}
      />
      {errors.colInput && (
        <span className="text-[#555]">This field is required!</span>
      )}
      <CodeInput
        shadows={shadows}
        setShadows={setShadows}
        register={register}
        placeholdersApperance={placeholdersApperance}
        setPlaceholdersApperance={setPlaceholdersApperance}
      />
      {errors.codeInput && (
        <span className="z-0 text-[#555]">{errors.codeInput.message}</span>
      )}
      <ButtonNext setShadow={setShadows} />
    </motion.form>
  );
};

export default StageThree;
