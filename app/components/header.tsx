import { FC } from "react";
import { Link } from "@remix-run/react";

type Props = {
  readonly loggedIn: boolean;
  readonly username: string;
};

const Header: FC<Props> = ({ loggedIn, username }) => {
  return (
    <nav className="bg-softwerker-dark text-white pt-2 pb-2">
      <div className="container mx-auto max-w-screen-lg px-8">
        <nav className="flex justify-between">
          <div className="flex flew-row items-center">
            <Link to="/" className="pr-4">
              <p className="text-xl font-bold text-white">
                Softwerker Vol. 18 - remix.run Demo
              </p>
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-white pr-4">
              <Link to="/todo">Todo Demo</Link>
            </p>
            {loggedIn ? (
              <>
                <p>Hello {username}</p>
              </>
            ) : (
              <p className="text-white">
                <Link to="/login">Login</Link>
              </p>
            )}
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Header;
