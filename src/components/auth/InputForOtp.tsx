"use client"
import React, { useImperativeHandle, useRef, forwardRef } from "react";

// Component types
type InputForOtpProps = {
  digit: string;
  i: number;
  handleOtpChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleOtpKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
};

export type InputForOtpRef = {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
};

const InputForOtp = forwardRef<InputForOtpRef, InputForOtpProps>(
  ({ digit, i, handleOtpChange, handleOtpKeyDown }, ref) => {
    // Ref management
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Imperative handle for parent component
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      getValue: () => {
        return inputRef.current?.value || "";
      }
    }), []);

    return (
      <input
        type="text"
        maxLength={1}
        value={digit}
        onChange={(e) => handleOtpChange(e, i)}
        onKeyDown={(e) => handleOtpKeyDown(e, i)}
        ref={inputRef}
        className="w-12 h-12 text-center rounded-md input-bg outline-[#024089] text-lg"
        autoComplete="off"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    );
  }
);

InputForOtp.displayName = "InputForOtp";
export default InputForOtp;
