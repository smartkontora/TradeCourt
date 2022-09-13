import React from "react";

interface ITextArea {
  value: string | undefined;
  onAction: any;
  label: string;
  placeholder: string;
  minLength?: string;
  maxLength?: string;
}

export const TextArea = ({
  value,
  label,
  placeholder,
  onAction,
  minLength,
  maxLength,
}: ITextArea) => {
  return (
    <label>
      <p className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</p>
      <textarea
        value={value}
        onChange={(e) => onAction(e.target.value)}
        placeholder={placeholder}
        className={`border-2 border-purple rounded-[15px] p-[10px] w-full
                 min-h-[110px]`}
      />
    </label>
  );
};