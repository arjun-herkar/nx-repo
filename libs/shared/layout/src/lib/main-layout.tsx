import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@process-workflow/shared/theme';
import { RootState, logout } from '@process-workflow/shared/state';
import { Button } from '@process-workflow/shared/ui';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const NavBar = styled.header`
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavBrand = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  text-decoration: none;
`;

const NavMenu = styled.ul`
  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links li {
    margin: 0 1rem;
  }
  .nav-links a {
    color: #666;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      text-decoration: none;
    }
  }
`;

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1.5rem;
  flex-grow: 1;
`;

const LanguageSwitcher = styled.div`
  .lang-button {
    margin: 0 0.25rem;
    padding: 8px 12px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: #333;
    font-weight: 500;
  }

  button,
  a {
    /* Inherit from NavButton */
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
      <NavBar>
        <NavContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <NavBrand to="/">Workflow Manager</NavBrand>
            <NavMenu>
              <ul className="nav-links">
                <li>
                  <Link to="/">{t('home')}</Link>
                </li>
                <li>
                  <Link to="/mfe-dashboard">{t('dashboard')}</Link>
                </li>
                <li>
                  <Link to="/designer">{t('designer')}</Link>
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
            </NavMenu>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSwitcher>
              <Button
                className="lang-button"
                onClick={() => changeLanguage('en')}
              >
                EN
              </Button>
              <Button
                className="lang-button"
                onClick={() => changeLanguage('es')}
              >
                ES
              </Button>
            </LanguageSwitcher>
            <UserActions>
              {isAuthenticated ? (
                <>
                  <span>Welcome, {user?.name}</span>
                  <Button onClick={() => dispatch(logout())}>Logout</Button>
                </>
              ) : (
                <Button as={Link} to="/login">
                  Login
                </Button>
              )}
              <Button onClick={toggleTheme}>Toggle Theme</Button>
            </UserActions>
          </div>
        </NavContent>
      </NavBar>
      <StyledMain>{children}</StyledMain>
    </LayoutContainer>
  );
}
