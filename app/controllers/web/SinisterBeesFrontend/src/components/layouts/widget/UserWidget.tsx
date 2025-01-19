import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import useUserStore from "../../../state/user-store"
import { cn } from "../../../utils/cn";

function UserWidget() {

  const theme ={
    dark:"bg-notion-dark-secondary",
    light:"bg-notion-light-secondary"
  }
  const user = useUserStore((state)=>state.user);
  const usetheme = useTheme()
  const tTheme = theme[usetheme.theme]
  const [img, setImg] = useState<string | null>(null);

  useEffect(() => {
      if (user?.photos?.[0]?.value) {
        setImg(user.photos[0].value);
      }
    }, [user]);
  
  return (
    <div className={
      cn(
        tTheme,
        " p-2 rounded"
      )
    }>
      <div className="">
        <img src={img} className="rounded"  alt="user profile image"></img>

      </div>

    </div>
  )
}

export default UserWidget