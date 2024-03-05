import { useContext, useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { stagesContext } from "../helpers/context";
import { motion } from "framer-motion";
import motionvariants from "../helpers/motionVariants";
import Quagga from "@ericblade/quagga2";

export default function PhotoInput({ setImageError }) {
  const [image, setImage] = useState();
  const ref = useRef(null);

  const { color, setDownload, setStage } = useContext(stagesContext);
  useEffect(() => {
    console.log("berofe quagga", image);
    Quagga.decodeSingle(
      {
        decoder: {
          readers: ["code_128_reader"], // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        src: image, // or 'data:image/jpg;base64,' + data
      },
      function (result) {
        if (result != null) {
          if (result.codeResult) {
            if (result.codeResult.code.toString().length === 11) {
              QRCode.toDataURL(result.codeResult.code)
                .then((url) => {
                  setDownload(url);
                  setStage((prevStage) => prevStage + 1);
                })
                .catch((err) => {
                  console.log("not detected");

                  setImageError((val) => !val);
                  console.error(err);
                });
            } else {
              console.log("not detected");
              setImageError((val) => !val);
            }
          } else {
            console.log("not detected");
            setImageError((val) => !val);
          }
        } else {
          console.log("not detected");
          setImageError((val) => !val);
        }
      }
    );
  }, [image]);
  return (
    <>
      <input
        ref={ref}
        id="photoInput"
        className="invisible "
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files || e.target.files.length == 0) return;

          const file = e.target.files[0];
          console.log(file);
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            if (reader.result != null) {
              console.log("input result", reader.result);
              setImage(reader.result.toString());
            } //error
          };
          //
        }}
      />
      <motion.div
        className="p-2 rounded-md cursor-pointer mb-14"
        whileHover={{ scale: 1.1 }}
        style={{
          borderWidth: 2,
          borderColor: `${color.color}`,
          color: `${color.color}`,
        }}
        variants={motionvariants.itemTop}
        onClick={() => {
          document.getElementById("photoInput").click();
        }}
      >
        I have a photo
      </motion.div>
    </>
  );
}
