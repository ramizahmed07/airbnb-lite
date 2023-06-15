"use client";

import { useRouter } from "next/navigation";

interface CategoryBoxProps {
  label: string;
  icon: JSX.Element;
  selected?: boolean;
}

export default function CategoryBox({
  label,
  icon,
  selected,
}: CategoryBoxProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/?category=${label}`)}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 
        border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      {icon}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}
