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

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-[#F3ECE9]"
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
          placeholder={placeholder}
          required={required}
          autoComplete={name}
          className={`
            w-full
            h-12
            rounded-xl
            bg-white/5
            border
            ${error ? "border-red-500" : "border-white/10"}
            px-4
            pr-12
            text-white
            placeholder:text-gray-500
            outline-none
            transition-all
            duration-300
            focus:border-[#C9A46B]
            focus:ring-2
            focus:ring-[#C9A46B]/30
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C6B8A8] hover:text-[#C9A46B] transition-colors"
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;