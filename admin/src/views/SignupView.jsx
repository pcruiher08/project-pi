import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CustomAlert from "../components/CustomAlert";
import colors from "../constants/colors";
import { AuthContext } from "../context/AuthContext";
import globalStyles from "../constants/styles";

function SignupView() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { signUp } = useContext(AuthContext);
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

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const postSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords dont match");
      return;
    }

    signUp({ name, email, password })
      .then((result) => {
        if (result) {
          history.push("/login");
        } else {
          setAlertMessage("Error al crear usuario");
          setAlertVariant("danger");
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.log("authentication failed catch ", error);
        setAlertMessage("Error al crear usuario");
        setAlertVariant("danger");
        setShowAlert(true);
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
      <h1 style={styles.loginTitle}>Registrarse</h1>
      <div style={styles.loginCard}>
        <Form onSubmit={postSignup}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nombre y apellido"
              onChange={onNameChange}
              required
            />
          </Form.Group>
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
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Confirmar contraseña"
              onChange={onConfirmPasswordChange}
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
            Registrarse
          </Button>
        </Form>
      </div>
      <p>
        O inicia sesión <Link to="/login">aquí</Link>
      </p>
    </Container>
  );
}

const styles = {
  primaryButton: {
    backgroundColor: colors.accent,
    color: colors.light,
  },
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
export default SignupView;
