import { useRef } from "react";

const InputText = () => {
  const textArea = useRef();

  return <textarea ref={textArea} />;
};

export default InputText;
