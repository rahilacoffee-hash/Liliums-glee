import { FiCheck } from "react-icons/fi";

const RULES = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw) => /\d/.test(pw) },
  { label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function PasswordRequirements({ password }) {
  return (
    <ul className="mt-3 mb-6 space-y-1.5">
      {RULES.map((rule) => {
        const passed = password.length > 0 && rule.test(password);

        return (
          <li
            key={rule.label}
            className={`flex items-center gap-2 text-xs transition-colors ${
              passed ? "text-[#C9A46B]" : "text-[#5A5148]"
            }`}
          >
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors ${
                passed ? "border-[#C9A46B] bg-[#C9A46B]/10" : "border-[#5A5148]"
              }`}
            >
              {passed && <FiCheck size={9} />}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordRequirements;