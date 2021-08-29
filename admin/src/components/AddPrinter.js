import React, { useState, useContext } from "react"
import "./AddUser.css"
import { Link } from "react-router-dom"
import { createUser } from "../services/users"
import { AuthContext } from "../context/AuthContext"

export const AddPrinter = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    api_id: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [valid, setValid] = useState(false)

  const handleNameInputChange = (event) => {
    setValues({ ...values, name: event.target.value })
  }

  const handleDescriptionInputChange = (event) => {
    setValues({ ...values, description: event.target.value })
  }

  const handleApiIdInputChange = (event) => {
    setValues({ ...values, api_id: event.target.value })
  }

  const handleCanPrintInputChange = (event) => {
    setValues({ ...values, can_print: event.target.value })
  }

  // const handleRadioInputChange = (event) => {
  //   setValues({ ...values, radio: event.target.value })
  // }

  const { user } = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (values.name && values.description && values.api_id) {
      setValid(true)
      var userValues = {
        ...values,
      }

      // createUser(userValues, "test@test.com")
      createUser(userValues, user.email)
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
      // console.log(user)
    }
    setSubmitted(true)

    // Aqui agregar el objeto creado
  }

  return (
    <div className="form-container add-user-form">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid ? (
          <div className="success-message">El usuario a sido registrado</div>
        ) : null}
        <input
          onChange={handleNameInputChange}
          value={values.name}
          id="name"
          className="form-field input-background"
          type="text"
          placeholder="Nombre"
          name="name"
        />
        {submitted && !values.name ? (
          <span className="validation-span">Agregue el nombre</span>
        ) : null}
        <input
          onChange={handleDescriptionInputChange}
          value={values.description}
          id="description"
          className="form-field input-background"
          type="text"
          placeholder="Descripción"
          name="description"
        />
        {submitted && !values.description ? (
          <span className="validation-span">Agregue la descripción</span>
        ) : null}
        <input
          onChange={handleApiIdInputChange}
          value={values.api_id}
          id="apiid"
          className="form-field input-background"
          type="text"
          placeholder="API ID"
          name="apiid"
        />
        {submitted && !values.api_id ? (
          <span className="validation-span">Agregue la API ID</span>
        ) : null}

        <div className="container marginTopClass">
          <div className="row">
            <div className="col-sm">
              {" "}
              <button className="btn btn-success addUserButtons" type="submit">
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
  )
}
