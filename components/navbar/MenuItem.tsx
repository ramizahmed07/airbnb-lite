interface MenuItemProps {
  onClick: () => void;
  children: string;
}

export default function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {children}
    </div>
  );
}
