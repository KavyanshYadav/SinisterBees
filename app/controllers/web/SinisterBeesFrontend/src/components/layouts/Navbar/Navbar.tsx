import { LucideHome } from "lucide-react";
import Button from "../../ui/Button/button";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../state/user-store";
import { useEffect, useState } from "react";

function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.photos?.[0]?.value) {
      setImg(user.photos[0].value);
    }
  }, [user]);

  const NavbarList = [
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: "/dashboard",
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: "/search",
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: "/search",
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: "/search",
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: "/search",
    },
  ];

  return (
    <div className="flex flex-col p-1 h-full bg-notion-dark-secondary w-fit">
      <div className="flex flex-col gap-2">
        <Button>
          <div>
            <img
              src={img || "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"} 
              onError={(e) => {
                e.currentTarget.src = "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"; 
              }}
              className="rounded-full h-10 w-10"
            />
          </div>
        </Button>
        {NavbarList?.map((e, key) => (
          <Button
            className="p-2"
            key={key}
            onClick={() => navigate(e.href)} 
          >
            {e?.icon}
          </Button>
        ))}
      </div>
      <div className="mt-auto">
        <Button>ane</Button>
      </div>
    </div>
  );
}

export default Navbar;
