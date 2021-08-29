import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import Container from "react-bootstrap/Container";
import ReactLoading from "react-loading";

function PrivateRoute({ component: Component, ...otherProps }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <>
      <Navigation />
      <Container className="mt-5 pt-4">
        <Route
          {...otherProps}
          render={(props) =>
            !isLoading ? (
              isAuthenticated ? (
                <Component {...props} />
              ) : (
                <Redirect to={"/login"} />
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
      </Container>
    </>
  );
}

export default PrivateRoute;
