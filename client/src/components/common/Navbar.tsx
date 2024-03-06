import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "../theme/mode-toggle";
import { AppDispatch, RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { logoutUser } from "@/redux/actions/User/authAction";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch:AppDispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async()=>{
    await dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <header className="w-full h-20 border-b flex justify-end items-center px-5">
      <div className="mr-5">
        <ModeToggle />
      </div>
      {user && (
        <>
        <Button className="h-10 w-28 border rounded-lg mx-3 flex items-center justify-center font-semibold" onClick={handleLogout}>
          Logout
        </Button>
          <div className="h-[80%]  border flex justify-between items-center px-3 gap-5 py-2 rounded-xl">
            <span>{user.user.username}</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
