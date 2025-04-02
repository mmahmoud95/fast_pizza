import { ReactNode } from "react";
import { Link, useNavigate } from "react-router";
interface IProps {
  children: ReactNode;
  to: string;
}

const LinkButton = ({ children, to }: IProps) => {
  const navigate = useNavigate();
  const classes =
    "text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer";
  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={classes}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
};

export default LinkButton;
