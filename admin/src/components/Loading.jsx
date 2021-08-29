import React, { useContext } from "react";
import ReactLoading from "react-loading";
import colors from "../constants/colors";

function Loading(props) {
  return (
    <div className={props.className} style={styles.spinner}>
      <ReactLoading
        type={"spinningBubbles"}
        color={colors.primary}
        height={200}
        width={200}
      />
    </div>
  );
}

const styles = {
  spinner: {
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "200px",
    height: "200px",
  },
};

export default Loading;
