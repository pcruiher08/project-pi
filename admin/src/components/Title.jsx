import React from "react";
import Button from "react-bootstrap/Button";
import globalStyles from "../constants/styles";

function Title(props) {
  return (
    <div className={props.className}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>{props.title}</h1>
        {props.hasButton ? (
          <Button
            variant="flat"
            bg="flat"
            className="flat-btn"
            style={{ ...styles.button, ...globalStyles.primaryButton }}
            onClick={props.buttonAction}
          >
            {props.buttonText}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: "left",
    marginLeft: "17px",
  },
  title: {
    display: "inline",
    marginRight: "24px",
  },
  button: {
    marginBottom: "12px",
  },
};

export default Title;
