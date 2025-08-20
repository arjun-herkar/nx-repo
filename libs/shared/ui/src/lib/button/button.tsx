import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const primaryStyles = css`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const secondaryStyles = css`
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;

  &:hover:not(:disabled) {
    background: #e9ecef;
    transform: translateY(-1px);
  }
`;

export const Button = styled.button<ButtonProps>`
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  ${({ variant }) => (variant === 'primary' ? primaryStyles : secondaryStyles)};
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

Button.defaultProps = {
  variant: 'secondary',
};

export default Button;
