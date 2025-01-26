import { LucideHome } from 'lucide-react';
import Button from '../../ui/Button/button';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../state/user-store';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../utils/cn';

function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const usetheme = useTheme();
  const [open, isOpen] = useState(false);

  const theme = {
    light: 'bg-notion-light-secondary',
    dark: 'bg-notion-dark-secondary',
  };

  const tTheme = theme[usetheme.theme];

  useEffect(() => {
    if (user?.photos?.[0]?.value) {
      setImg(user.photos[0].value);
    }
  }, [user]);

  const NavbarList = [
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: '/dashboard',
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: '/search',
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: '/search',
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: '/search',
    },
    {
      icon: <LucideHome color="#878787" size="1.4rem" />,
      href: '/search',
    },
  ];
  // const openStyle = open ? "w-52": "w-0";
  const divref = useRef<HTMLDivElement>(null);
  return (
    <div
      onMouseEnter={() => {
        if (divref.current) {
          divref.current.style.width = '16rem';
        }
        isOpen(() => true);
      }}
      onMouseLeave={() => {
        if (divref.current) {
          divref.current.style.width = '0';
        }

        isOpen(() => false);
      }}
      className={cn(
        'flex flex-col p-1 h-full  min-w-fit transition-all ease-linear duration-200',
        tTheme,
      )}
      ref={divref}
    >
      <div className="flex flex-col gap-2">
        <Button>
          <div>
            <img
              src={
                img ||
                'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png'
              }
              onError={(e) => {
                e.currentTarget.src =
                  'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png';
              }}
              className="rounded-full h-10 w-10"
            />
          </div>
        </Button>
        {NavbarList?.map((e, key) => (
          <Button className="p-2" key={key} onClick={() => navigate(e.href)}>
            {e?.icon}

            {open ? <span className="w-full text-left">{e?.href}</span> : ''}
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
