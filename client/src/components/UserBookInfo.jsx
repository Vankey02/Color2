import { useContext } from "react";
import { stagesContext } from "../helpers/context";

const UserBookInfo = ({ r, c, code, time, index }) => {
  const { color } = useContext(stagesContext);
  return (
    <div
      className="flex w-36 md:h-36 md:w-72 rounded-xl my-2 "
      style={{ backgroundColor: `${color.color}` }}
    >
      <div className="pl-2 text-[#222]">
        <p
          className="rounded-full bg-[#222] text-center w-6 h-6 my-1"
          style={{ color: `${color.color}` }}
        >
          {index + 1}
        </p>
        <p className="px-2 text-[#222]">
          Date: {new Date(time).getDate()}/{new Date(time).getMonth() + 1}/
          {new Date(time).getFullYear()}
        </p>
        <p className="px-2 text-[#222]">Row: {r}</p>
        <p className="px-2 text-[#222]">Seat: {c}</p>
        <p className="px-2 text-[#222]">#{code}</p>
      </div>
    </div>
  );
};

export default UserBookInfo;
