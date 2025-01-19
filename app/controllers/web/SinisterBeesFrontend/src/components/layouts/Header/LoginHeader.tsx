import { useTheme } from "../../../context/ThemeContext"
import { cn } from "../../../utils/cn";
import Button from "../../ui/Button/button";
import Input from "../../ui/Input/Input";

function LoginHeader() {

    const Theme = {
        light : "",
        dark:"",
    }

    const {theme,toggleTheme} = useTheme();

  return (
    <div className={cn("w-full p-2 bg-transparent  border-b "
        ,Theme[theme],
        "flex flex-row items-center"
    )}>
        <div>
            <Button onClick={(e)=>{toggleTheme();console.log(e.target) }}>
                Theme switch
            </Button>
        </div>
        <div>
            <Input />
        </div>
        
    </div>
  )
}

export default LoginHeader