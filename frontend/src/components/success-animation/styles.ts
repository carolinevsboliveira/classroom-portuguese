import styled from 'styled-components';

const CenteredBox = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;
export { CenteredBox, ButtonBox };
