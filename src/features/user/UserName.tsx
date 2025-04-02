import { useSelector } from "react-redux";
import { getUserInfo } from "./userSlice";

const UserName = () => {
  const { userName } = useSelector(getUserInfo);
  if (!userName) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
};

export default UserName;
