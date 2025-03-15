import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {
    throw new Error("Cannot toggle dark mode without DarkModeProvider");
  },
});

interface DarkModeProviderProps {
  children: React.ReactNode;
}
function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  function toggleDarkMode() {
    setIsDarkMode((i) => !i);
  }
  return (
    <DarkModeContext.Provider value={useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode])}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of darkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
