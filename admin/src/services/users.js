import { SERVER_URL } from "../config"

export function getUsers(email) {
  return fetch(
    // Recibir email por medio de una variable

    `${SERVER_URL}/HID-services/users.php?email=${email}`
  ).then((resp) => resp.json())
}
// http://connect.qualtecmty.com.mx/HID-services/create_user.php
export function createUser(user, email) {
  let url = `${SERVER_URL}/HID-services/create_user.php?email=${email}`

  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }

  return fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error()
    })
    .then((responseJSON) => {
      return responseJSON
    })
}
/////////////////////////////////////////
// Talvez no tiene el email

export function editUser(user) {
  let url = `${SERVER_URL}/HID-services/update_user.php`
  // let url = `${SERVER_URL}/HID-services/update_user.php?email=${email}`

  let settings = {
    method: "PUT",
    // method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }

  return fetch(url, settings)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error()
    })
    .then((responseJSON) => {
      return responseJSON
    })
}
