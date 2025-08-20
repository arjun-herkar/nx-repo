import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DesignerFeatureDesignerProps {}

const StyledDesignerFeatureDesigner = styled.div`
  color: pink;
`;

export function DesignerFeatureDesigner(props: DesignerFeatureDesignerProps) {
  return (
    <StyledDesignerFeatureDesigner>
      <h1>Welcome to DesignerFeatureDesigner!</h1>
    </StyledDesignerFeatureDesigner>
  );
}

export default DesignerFeatureDesigner;
