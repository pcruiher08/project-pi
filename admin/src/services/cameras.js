import { SERVER_URL } from "../config"

export function getCameras() {
  return fetch(
    `${SERVER_URL}/cameras/all`
  ).then((resp) => resp.json())
}

export function createCamera(values) {
  let url = `${SERVER_URL}/cameras/create`

  let settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
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