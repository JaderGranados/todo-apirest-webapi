import { Fragment, FC } from "react";
import { Link } from "react-router-dom";
import AuthenticateParams from "../../interfaces/authenticate-params.interface";


const Page: FC<Omit<AuthenticateParams, "isLoged">> = (props) => {
  const { user } = props;
  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Todo list
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {!user?.isLoged ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="nav-link" onClick={props.logout}>
                  Logout
                </button>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Page;
