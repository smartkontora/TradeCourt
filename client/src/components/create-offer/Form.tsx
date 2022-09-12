import React, { useEffect } from "react";
import { Step1 } from "./form-pages/Step1";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const Form = () => {
  const { step } = useTypedSelector((state) => state.formReducer);

  return (
    <div
      className={
        "bg-white break-words rounded-[20px] shadow-lg p-5 min-h-[505px]"
      }
    >
      {step === 1 && <Step1 />}
    </div>
  );
};