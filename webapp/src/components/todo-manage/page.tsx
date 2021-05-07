import {FC, Fragment, SyntheticEvent, useState} from "react";
import ToDo from "../../interfaces/todo.interface";

const Page: FC<{todo: ToDo | undefined}> = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    return (
    <Fragment>
        <form onSubmit={handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Insert all todo data</h1>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Name"
          required
          autoFocus
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          id="description"
          className="form-control"
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Create
        </button>
      </form>
    </Fragment>
    );
}

export default Page;