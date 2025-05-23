import React from "react";

type BaseProps = {
  text: React.ReactNode;
  action?: () => void;
  className?: string;
  selected: boolean;
};

type AnchorProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type DivProps = BaseProps & {
  href?: undefined;
  target?: undefined;
  rel?: undefined;
};

type DashboardSidemenuItemProps = AnchorProps | DivProps;

export const DashboardSidemenuItem: React.FC<DashboardSidemenuItemProps> = ({
  text,
  action,
  className = "",
  selected,
  ...rest
}) => {
  if (!text) return null;

  const Tag: React.ElementType = "href" in rest ? "a" : "div";
  const { href, target, rel } = rest as AnchorProps;
  const baseClass =
    "flex gap-2 items-center relative px-4 py-2 hover:bg-neutral-200 transition-colors duration-300 rounded cursor-pointer";

  const handleClick = (e: React.MouseEvent) => {
    action?.();
    if ("href" in rest && (href === "#" || href.startsWith("javascript:"))) {
      e.preventDefault();
    }
  };

  return (
    <Tag
      onClick={handleClick}
      href={href}
      target={target}
      rel={rel}
      className={`${baseClass} ${
        selected ? "bg-neutral-200 " : "bg-neutral-100"
      } ${className}`}
    >
      {text}
      {selected && (
        <span className="bg-neutral-500 start-0 w-[4px] h-[60%] absolute top-1/2 -translate-y-1/2  rounded-full"></span>
      )}
    </Tag>
  );
};
