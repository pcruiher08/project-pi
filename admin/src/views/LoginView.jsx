import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CustomAlert from "../components/CustomAlert";
import { AuthContext } from "../context/AuthContext";
import colors from "../constants/colors";
import globalStyles from "../constants/styles";

function LoginView(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { login } = useContext(AuthContext);
  const history = useHistory();

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const postLogin = (e) => {
    e.preventDefault();
    login({ email, password })
      .then((success) => {
        if (success) {
          history.push("/");
        } else {
          console.log("authentication failed");
          setAlertMessage("Error de login");
          setAlertVariant("danger");
          setShowAlert(true);
        }
      })
      .catch((error) => {
        setAlertMessage("Error de login");
        setAlertVariant("danger");
        setShowAlert(true);
        console.log("authentication failed catch ", error);
      });
  };

  return (
    <Container style={styles.loginContainer}>
      <CustomAlert
        variant={alertVariant}
        message={alertMessage}
        show={showAlert}
        onClose={onCloseAlert}
      />
      <h1 style={styles.loginTitle}>Login</h1>
      <div style={styles.loginCard}>
        <Form onSubmit={postLogin}>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={onEmailChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={onPasswordChange}
              required
            />
          </Form.Group>
          <Button
            className="mt-3 mb-2"
            variant="flat"
            bg="flat"
            type="submit"
            style={globalStyles.primaryButton}
          >
            Entrar
          </Button>
        </Form>
      </div>
      <p>
        O regístrate <Link to="/signup">aquí</Link>
      </p>
    </Container>
  );
}

const styles = {
  loginCard: {
    margin: "auto",
    width: "300px",
  },
  loginContainer: {
    textAlign: "center",
  },
  loginTitle: {
    marginTop: "80px",
    marginBottom: "45px",
    color: colors.primary,
    fontSize: "65px",
  },
};

export default LoginView;
