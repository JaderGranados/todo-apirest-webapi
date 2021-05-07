import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import { PAGES } from "./types/pages.enum";
import NotFound from "./components/notfound";
import authContext from "./auth.context";
import { useState } from "react";
import TodoManage from "./components/todo-manage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="App text-center">
      <authContext.Provider value={{loggedIn, setLoggedIn}}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path={PAGES.HOME} exact component={Home} />
          <Route path={PAGES.LOGIN} component={Login} />
          <Route path={PAGES.REGISTER} component={Register} />
          <Route path={PAGES.CREATE} component={TodoManage} />
          <Route path={PAGES.EDIT + '/:id'} component={TodoManage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      </authContext.Provider>
    </div>
  );
}

export default App;
