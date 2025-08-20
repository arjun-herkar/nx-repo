import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DashboardFeatureDashboardProps {}

const StyledDashboardFeatureDashboard = styled.div`
  color: pink;
`;

export function DashboardFeatureDashboard(
  props: DashboardFeatureDashboardProps
) {
  return (
    <StyledDashboardFeatureDashboard>
      <h1>Welcome to DashboardFeatureDashboard!</h1>
    </StyledDashboardFeatureDashboard>
  );
}

export default DashboardFeatureDashboard;
