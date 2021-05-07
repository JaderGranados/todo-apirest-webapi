import { Fragment } from "react";

export default function Page() {
  return (
    <Fragment>
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please fill your data</h1>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Full name"
          required
          autoFocus
        />
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Username"
          required
        />
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </Fragment>
  );
}
