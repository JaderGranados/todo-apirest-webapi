import { Fragment, FC } from "react";
import { Link } from "react-router-dom";
import ToDo from "../../interfaces/todo.interface";
import { PAGES } from "../../types/pages.enum";

const Page: FC<{ todoList: Array<ToDo> }> = (props) => {
  console.log(props.todoList);
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-auto"><Link to={PAGES.EDIT + '/2'} className="btn btn-success">Create</Link></div>
        </div>
        <div className="row">
          <div className="col s12 board">
            <table className="table table-hovered" id="simple-board">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {props.todoList.map((value) => {
                  return(
                  <tr>
                    <td>{value.name}</td>
                    <td>{value.description}</td>
                    <td>opciones</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="todoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
