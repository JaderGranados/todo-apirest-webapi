import { Fragment, useState, SyntheticEvent, FC } from "react";
import User from "../../interfaces/user.interface";

const Page: FC<{submit(user: User): void}> = (props) =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    props.submit({
      username,
      password,
      isLoged: false
    });
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Username"
          required
          autoFocus
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </Fragment>
  );
}

export default Page; 