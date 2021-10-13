import { useState } from "react";

const useInput = (func) => {
  const [input, setInput] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputIsValid = func(input);
  const inputIsInvalid = !inputIsValid && inputIsTouched;

  const onChangeInputHandler = (event) => {
    setInputIsTouched(true);
    setInput(event.target.value);
  };

  const onBlurInputHandler = () => {
    setInputIsTouched(true);
  };

  const resetInput = () => {
    setInput("");
    setInputIsTouched(false);
  };

  return {
    input,
    inputIsValid,
    inputIsInvalid,
    onChangeInputHandler,
    onBlurInputHandler,
    resetInput,
  };
};

export default useInput;
