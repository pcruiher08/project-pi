import React, { useState, useEffect, useContext } from "react";
import "./AddUser.css";
import { Link, useHistory } from "react-router-dom";
import { createCamera } from "../services/cameras";
import { getPrinters } from "../services/printers";
import { AuthContext } from "../context/AuthContext";

export const AddCamera = () => {
    const [values, setValues] = useState({
        latitude: "",
        longitude: "",
        street: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const history = useHistory();

    const handleLatitudeInputChange = (event) => {
        setValues({ ...values, latitude: event.target.value });
    };

    const handleLongitudeInputChange = (event) => {
        setValues({ ...values, longitude: event.target.value });
    };

    const handleStreetInputChange = (event) => {
        setValues({ ...values, street: event.target.value });
    };

    // const handleRadioInputChange = (event) => {
    //   setValues({ ...values, radio: event.target.value })
    // }

    const [data, setData] = useState([]);

    const { user } = useContext(AuthContext);
    // console.log(user.email)

    useEffect(() => {
        // const val = getPrinters("test@test.com").then((resp) => {
        const val = getPrinters(user.email).then((resp) => {
            setData(resp);
        });
    }, []);

    var renderedOutput = data.map((item) => (
        <option id="default_printer_id" value={[`${item.deviceName}`]}>
            {item.deviceName}
        </option>
    ));

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            values.latitude &&
            values.longitude &&
            values.street
        ) {

            values.directions = [180];

            setValid(true);
            var userValues = {
                ...values,
            };
            createCamera(userValues)
                .then((result) => {
                    console.log(result);
                    history.push("/");
                })
                .catch((error) => console.log(error));
        }

        setSubmitted(true);

    };

    return (
        <div className="form-container add-user-form">
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    onChange={handleLatitudeInputChange}
                    value={values.latitude}
                    id="latitude"
                    className="form-field input-background"
                    type="text"
                    placeholder="Latitude"
                    name="latitude"
                />
                
                <input
                    onChange={handleLongitudeInputChange}
                    value={values.longitude}
                    id="longitude"
                    className="form-field input-background"
                    type="text"
                    placeholder="Longitude"
                    name="longitude"
                />
                <input
                    onChange={handleStreetInputChange}
                    value={values.street}
                    id="street"
                    className="form-field input-background"
                    type="text"
                    placeholder="Street"
                    name="street"
                />
                <div className="container marginTopClass">
                    <div className="row">
                        <div className="col-sm">
                            {" "}
                            <button
                                className="btn btn-success addUserButtons"
                                type="submit"
                            >
                                Registrar <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>
                        <div className="col-sm">
                            {" "}
                            <Link to="/">
                                <button className="btn btn-danger addUserButtons">
                                    Cancelar <i className="fas fa-times"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
