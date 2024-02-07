import { motion } from "framer-motion";
import motionvariants from "../helpers/motionVariants";
import axios from "axios";
import { useContext, useEffect } from "react";
import { stagesContext } from "../helpers/context.js";
import UserBookInfo from "./UserBookInfo";

const UserComp = ({
  user,
  mail,
  tic,
  log,
  usersInfo,
  setUsersInfo,
  setDisplayedUser,
  displayedUser,
}) => {
  const getInfo = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_GET_USERS_INFO, {
        params: { mail: mail },
      });
      //console.log(res.data);
      setUsersInfo(res.data);
      setDisplayedUser((prevState) => {
        return {
          ...prevState,
          user: user,
          mail: mail,
          log: log,
          tic: tic,
          books: res.data,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };
  const { color } = useContext(stagesContext);
  return (
    <div
      className="flex w-[30vw] py-8  h-10 rounded-md my-1 text-center justify-center items-center cursor-pointer"
      style={{
        backgroundColor: "#222",
        color: `${color.color}`,
        borderWidth: 1,
        borderColor: `${color.color}`,
      }}
      onClick={() => {
        getInfo();
      }}
    >
      {user}
    </div>
  );
};

export default UserComp;
