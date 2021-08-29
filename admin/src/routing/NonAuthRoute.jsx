import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReactLoading from "react-loading";

function NonAuthRoute({ component: Component, ...otherProps }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        !isLoading ? (
          !isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/"} />
          )
        ) : (
          <ReactLoading
            type={"spinningBubbles"}
            color={"black"}
            height={667}
            width={375}
          />
        )
      }
    />
  );
}

export default NonAuthRoute;
