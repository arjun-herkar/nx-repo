import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@process-workflow/shared/theme';

const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.headerBg};
  padding: 1rem;
  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0 1rem;
  }
  a {
    color: ${({ theme }) => theme.headerColor};
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1.5rem;
  text-align: center;
  min-height: calc(100vh - 60px); /* Adjust based on header height */
`;

const ThemeToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #555;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const LanguageSwitcher = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  button {
    margin: 0 0.25rem;
    background: #555;
    color: white;
    border: 1px solid white;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
`;

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <header>
        <StyledNav>
          <LanguageSwitcher>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('es')}>ES</button>
          </LanguageSwitcher>
          <ul>
            <li>
              <Link to="/">{t('home')}</Link>
            </li>
            <li>
              <Link to="/mfe-dashboard">{t('dashboard')}</Link>
            </li>
            <li>
              <Link to="/mfe-templates">{t('templates')}</Link>
            </li>
            <li>
              <Link to="/mfe-workflow">{t('workflow')}</Link>
            </li>
            <li>
              <Link to="/mfe-admin">{t('admin')}</Link>
            </li>
          </ul>
          <ThemeToggleButton onClick={toggleTheme}>Toggle Theme</ThemeToggleButton>
        </StyledNav>
      </header>
      <StyledMain>{children}</StyledMain>
    </div>
  );
}
