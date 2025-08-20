import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

export default Card;
