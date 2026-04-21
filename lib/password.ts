const DIGITS = "0123456789";
const ALPHANUMERIC = `${DIGITS}abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;

type PasswordStrength = {
  score: number;
  label: string;
  color: string;
};

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "", color: "" };

  const chars = [...password];
  const hasMinLength = password.length >= 8;
  const hasLongLength = password.length >= 12;
  const hasUppercase = chars.some((c) => c >= "A" && c <= "Z");
  const hasNumber = chars.some((c) => DIGITS.includes(c));
  const hasSymbol = chars.some((c) => !ALPHANUMERIC.includes(c));

  const score = [hasMinLength, hasLongLength, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
  if (score <= 2) return { score, label: "Fair", color: "bg-orange-400" };
  if (score <= 3) return { score, label: "Good", color: "bg-yellow-400" };
  return { score, label: "Strong", color: "bg-green-500" };
}
