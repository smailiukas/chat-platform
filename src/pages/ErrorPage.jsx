import styled from "styled-components";

function ErrorPage() {
  return (
    <>
      <FormContainer>
        404
      </FormContainer>
      </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #32302f;
`;


export default ErrorPage;
