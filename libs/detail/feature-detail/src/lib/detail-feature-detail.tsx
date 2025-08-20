import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DetailFeatureDetailProps {}

const StyledDetailFeatureDetail = styled.div`
  color: pink;
`;

export function DetailFeatureDetail(props: DetailFeatureDetailProps) {
  return (
    <StyledDetailFeatureDetail>
      <h1>Welcome to DetailFeatureDetail!</h1>
    </StyledDetailFeatureDetail>
  );
}

export default DetailFeatureDetail;
