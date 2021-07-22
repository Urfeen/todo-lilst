import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const StyledTextareaWithSubtasks = styled.div`
  textarea {
    width: 100%;
    color: yellow;
  }
`;

const TextareaWithSubtasks = ({ className }) => {
  let textarea = useRef();

  useEffect(() => {
    textarea.focus();
  }, []);

  return (
    <StyledTextareaWithSubtasks className={className ? className : ""}>
      <TextareaAutosize ref={(tag) => (textarea = tag)} />
    </StyledTextareaWithSubtasks>
  );
};

export default TextareaWithSubtasks;
