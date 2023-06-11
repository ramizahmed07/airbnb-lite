import { IconType } from "react-icons";

interface ButtonProps {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export default function Button({
  children,
  onClick,
  icon: Icon,
  disabled = false,
  outline = false,
  small = false,
}: ButtonProps) {
  return (
    <button
      className={`
    relative disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg transition hover:opacity-80 w-full
    ${outline ? "bg-white" : "bg-rose"}
    ${outline ? "border-black" : "bg-rose-500"}
    ${outline ? "text-black" : "text-white"}
    ${small ? "py-1" : "py-3"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "font-light" : "font-semibold"}
    ${small ? "border" : "border-2"}

  `}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={24} />}
      {children}
    </button>
  );
}
