import { ReactNode, useState } from 'react';

type SidebarLinkGroupProps = {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
};

export function SidebarLinkGroup({
  children,
  activeCondition,
}: SidebarLinkGroupProps) {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
}
