import { ReactNode } from "react";
import { Link } from "react-router";

interface IProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: "small" | "primary" | "secondary" | "rounded";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, disabled, to, type, onClick }: IProps) => {
  const base =
    "inline-block text-sm cursor-pointer rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-all duration-500 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-0 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + "px-4 py-3 md:py-4 md:px-6",
    small: base + "px-4 py-2 sm:py-2.5 sm:px-5 text-xs",
    secondary:
      "inline-block text-sm cursor-pointer rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-400 uppercase transition-all duration-500 hover:bg-stone-300 hover:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:outline-0 disabled:cursor-not-allowed px-4 py-2.5 md:py-3.5 md:px-6",
    rounded: base + "px-2.5 py-1 sm:py-2 sm:px-3 text-xs rounded-full",
  };
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
