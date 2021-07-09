import React, { useMemo, useState, useEffect } from 'react';
import {ThemeProvider} from 'styled-components';

import themes from './styles/themes';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';

function App() {
  const localThemes =localStorage.getItem('theme')
  
  const [theme, setTheme] =useState(()=>{
    if(!localThemes){
      return 'dark'
    }
    return localThemes
  });

  const currentTheme = useMemo(()=>{
    return themes[theme] || themes.dark;
  }, [theme]);

  function handleToggleTheme(){
    setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
  }

  useEffect(()=>{
    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Layout 
        onToggleTheme={handleToggleTheme}
        selectedTheme={theme}
      />
    </ThemeProvider>
  );
};

export default App;
