import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
}

export default function CategoryInput({
  selected,
  label,
  icon: Icon,
  onClick,
}: CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
    rounded-xl
    border-2
    p-4
    flex
    flex-col
    gap-3
    hover:border-black
    transition
    cursor-pointer
    ${selected ? "border-black" : "border-neutral-200"}
`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
