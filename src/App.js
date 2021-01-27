import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Home from "./pages/Home";
import IndividualIssue from "./pages/IndividualIssue";
// Components
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/issue/:id">
            <IndividualIssue />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
