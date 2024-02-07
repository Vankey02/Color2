import UserComp from "./UserComp";
import { motion } from "framer-motion";
import motionvariants from "../helpers/motionVariants";
import { useState, useEffect, useContext } from "react";
import { stagesContext } from "../helpers/context";
import axios from "axios";
import UserBookInfo from "./UserBookInfo";
import { PulseLoader } from "react-spinners";

const RootPanel = () => {
  const { color } = useContext(stagesContext);
  useEffect(() => {
    fetchData();
  }, []);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersInfo, setUsersInfo] = useState([]);
  const [displaydUser, setDisplayedUser] = useState({
    user: "",
    mail: "",
    log: "",
    tic: "",
    books: [],
  });
  useEffect(() => {
    console.log("displayedUser");
    console.log(displaydUser);
  }, [displaydUser]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(import.meta.env.VITE_GET_USERS_PATH);
      setIsLoading(false);
      console.log(res.data);
      setUsers(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <motion.div
      className="flex flex-col justify-center w-[100vw] md:w-[80vw] h-[100svh]"
      variants={motionvariants.rootPanelApperance}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-center w-[100vw] md:w-[80vw]   ">
        <motion.div
          className="flex flex-col"
          style={{ color: `${color.color}` }}
        >
          <p className="flex text-xl py-6 self-center ">{displaydUser.mail}</p>
          <div className="flex flex-row w-[90vw] md:w-[80vw] justify-around">
            <div>
              <p className="text-3xl">Tic {displaydUser.tic}</p>
              <p className="text-3xl">Log {displaydUser.log}</p>
              <div className="flex h-72 overflow-y-scroll pt-4 mt-6">
                {isLoading && <PulseLoader color={`${color.color}`} />}
                {users.length > 0 && (
                  <motion.div
                    className="flex flex-col items-center w-[30vw]"
                    variants={motionvariants.usersContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {users.map((item, index) => (
                      <motion.div key={index} variants={motionvariants.item}>
                        <UserComp
                          user={item.name}
                          mail={item.mail}
                          tic={item.tic}
                          log={item.log}
                          setDisplayedUser={setDisplayedUser}
                          usersInfo={usersInfo}
                          displayedUser={displaydUser}
                          setUsersInfo={setUsersInfo}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {displaydUser.books.length > 0 && (
              <div className="flex flex-col h-96 overflow-y-scroll">
                {displaydUser.books.reverse().map((item, index) => (
                  <div key={index}>
                    <UserBookInfo
                      index={index}
                      code={item.code}
                      r={item.r}
                      c={item.c}
                      time={item.time}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RootPanel;
