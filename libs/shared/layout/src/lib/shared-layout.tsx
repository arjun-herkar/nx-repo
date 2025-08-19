import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SharedLayoutProps {}

const StyledSharedLayout = styled.div`
  color: pink;
`;

export function SharedLayout(props: SharedLayoutProps) {
  return (
    <StyledSharedLayout>
      <h1>Welcome to SharedLayout!</h1>
    </StyledSharedLayout>
  );
}

export default SharedLayout;
