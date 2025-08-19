import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: #2c3e50;
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
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledMain = styled.main`
  padding: 1.5rem;
  text-align: center;
`;

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <StyledNav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mfe-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/mfe-templates">Templates</Link>
            </li>
            <li>
              <Link to="/mfe-workflow">Workflow</Link>
            </li>
            <li>
              <Link to="/mfe-admin">Admin</Link>
            </li>
          </ul>
        </StyledNav>
      </header>
      <StyledMain>{children}</StyledMain>
    </div>
  );
}
