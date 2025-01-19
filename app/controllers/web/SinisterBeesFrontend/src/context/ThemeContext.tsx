import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const rootElement = document.getElementById("root");

  useEffect(()=>{
    console.log(theme)
    setTheme(()=>{
      return localStorage.getItem("theme")
    })

  },[])
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.backgroundColor = theme === "light" ? "#FFFFFF" : "#181818";
      
    }
    localStorage.setItem("theme",theme)
  }, [theme]);
  const toggleTheme = () => {
    
    setTheme((prevTheme) => {
      if(prevTheme==="light"){
        return "dark"
      }else{
        return "light"
      }
    });
    
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
