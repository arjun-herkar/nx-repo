import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@process-workflow/shared/theme';
import { RootState, logout } from '@process-workflow/shared/state';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.headerColor};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-links {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links li {
    margin: 0 1rem;
  }
  .nav-links a {
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
  flex-grow: 1;
`;

const ThemeToggleButton = styled.button`
  background: #4a5568;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
  margin: 0 1rem;

  &:hover {
    background: #2d3748;
  }
`;

const LanguageSwitcher = styled.div`
  button {
    margin: 0 0.25rem;
    background: transparent;
    color: white;
    border: 1px solid #718096;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: #4a5568;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 1rem;
  }

  button,
  a {
    background: #718096;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 6px;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      background: #4a5568;
    }
  }
`;

export function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LayoutContainer>
      <header>
        <StyledNav>
          <LanguageSwitcher>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('es')}>ES</button>
          </LanguageSwitcher>
          <ul className="nav-links">
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
          <UserActions>
            {isAuthenticated ? (
              <>
                <span>Welcome, {user?.name}</span>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <ThemeToggleButton onClick={toggleTheme}>Toggle Theme</ThemeToggleButton>
          </UserActions>
        </StyledNav>
      </header>
      <StyledMain>{children}</StyledMain>
    </LayoutContainer>
  );
}
