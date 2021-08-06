import styled from "styled-components";

const StyledInputCheckBox = styled.div`
  padding: 0px 0px 1.2rem 1.2rem;
  max-width: 1.2rem;
  position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    z-index: 1;
    padding: 0px 0px 1.2rem 1.2rem;
  }
  span {
    position: absolute;
    width: 1.1rem;
    height: 1.1rem;
    border: 0.1rem solid #395ac0;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0.2rem;
    margin: 0px 0px 0px -1.2rem;

    box-shadow: 0 0 0rem 0rem #5c86ff;
    transition: box-shadow 0.1s ease, background-color 0.1s ease, border 0.1s ease;
  }

  input:checked + span {
    background-color: #395ac0;
  }
  input:focus + span {
    box-shadow: 0 0 0.1rem 0.05rem #5c86ff;
    border: 0.1rem solid #5c86ff;
  }
  input:checked:focus + span {
    background-color: #5c86ff;
    border: 0.1rem solid #5c86ff;
    box-shadow: 0 0 0.1rem 0.05rem #5c86ff;
  }
  input:disabled + span {
    border: 0.1rem solid #2f3955;
  }
  input:checked:disabled + span {
    background-color: #2f3955;
    border: 0.1rem solid #2f3955;
  }
`;

export default StyledInputCheckBox;

