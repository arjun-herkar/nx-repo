import React, { useState, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {
    /* do nothing */
  },
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const contextValue = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
