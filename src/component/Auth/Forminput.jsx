import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-7">
      <label
        htmlFor={name}
        className={`block mb-2 text-xs tracking-[2px] uppercase transition-colors ${
          focused ? "text-[#C9A46B]" : "text-[#8C7F72]"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={name}
          className={`
            w-full
            h-11
            bg-transparent
            border-0
            border-b
            ${error ? "border-[#6B2737]" : "border-white/15"}
            px-0
            pr-10
            text-[#F3ECE9]
            placeholder:text-[#5A5148]
            outline-none
            transition-colors
            duration-300
            focus:border-[#C9A46B]
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8C7F72] hover:text-[#C9A46B] transition-colors"
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs text-[#C97A8A]">{error}</p>
      )}
    </div>
  );
}

export default FormInput;