import * as Clerk from "@clerk/elements/common";
import { useState } from "react";

/**
 * @description Clerk input component
 * @param {string} identifier - The identifier of the input
 * @param {string} label - The label of the input
 * @param {string} type - The type of the input
 * @param {boolean} required - Whether the input is required
 * @returns {JSX.Element}
 */
const ClerkInput = ({
  identifier,
  label,
  type,
  required,
  ...props
}: {
  identifier: string;
  label: string;
  type: string;
  required?: boolean;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="relative">
      <Clerk.Field name={identifier}>
        <Clerk.Label className="text-sm font-medium text-black">
          {label}
        </Clerk.Label>
        <Clerk.Input
          {...props}
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          required={required}
          className="w-full mt-1 bg-white text-black ring-1 outline-none ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400 p-2 rounded-md"
        />
        <Clerk.FieldError className="block text-sm text-red-400 mt-2" />
      </Clerk.Field>
      {type === "password" && (
        <span
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 translate-y-1/2 right-4 cursor-pointer uppercase text-xs text-black"
        >
          {isPasswordVisible ? "Hide" : "Show"}
        </span>
      )}
    </div>
  );
};

export default ClerkInput;
