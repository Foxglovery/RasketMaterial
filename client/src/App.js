import { useEffect, useState } from "react";
import "./App.css";

// import { tryGetLoggedInUser } from "./managers/authManager";

import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import {tryGetLoggedInUser} from './components/managers/authManager';
import { CircularProgress } from "@mui/material";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  );
}

export default App;
